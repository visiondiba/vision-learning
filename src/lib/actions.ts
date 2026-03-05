/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import { redis } from "./redis";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "./auth";
import { revalidatePath } from "next/cache";
import { findSantriInExcel } from "./xlsxbridge";
import bcrypt from "bcrypt"; 

export async function loginAction(prevState: any, formData: FormData) {
    const identifier = formData.get('identifier') as string;
    const passwordInput = formData.get('password') as string;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { stambuk: identifier },
                { username: identifier }
            ]
        }
    });

    if (!user) {
        return { error: "Identitas tidak ditemukan!" };
    }

    const isPasswordValid = await bcrypt.compare(passwordInput, user.password);
    
    if (!isPasswordValid) {
        return { error: "Password salah!" };
    }

    const sessionId = uuid();
    
    await redis.set(`session:${sessionId}.darussalam`, JSON.stringify({
        user
    }), 'EX', 7200);


    const token = await encrypt(sessionId);
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        path: "/",
        maxAge: 7200 
    });

    let targetPath = "/dashboard";
    if (user.role === "ADMIN") targetPath = "/dashboard/admin";
    if (user.role === "USTADZ") targetPath = "/dashboard/ustadz ";
    
    redirect(targetPath);
}

export async function registerSantri(prevState: any, formData: FormData) {
  const stambukRaw = formData.get("stambuk") as string;
  const passwordRaw = formData.get("password") as string;
  const divisiInput = formData.get("divisi") as string;

  const excelData = await findSantriInExcel(stambukRaw) as Record<string, any> | null;
  
  if (!excelData) {
    return { error: "Data tidak ditemukan di database pusat (Excel)!" };
  }

  // 2. Format Stambuk (1.46.xxx)
  const clean = stambukRaw.replace(/\./g, "").trim();
  const formattedStambuk = clean.length >= 8 
    ? `${clean.substring(0, 1)}.${clean.substring(1, 3)}.${clean.substring(3)}` 
    : clean;

  // 3. Cek Duplikasi
  const existing = await prisma.user.findUnique({ where: { stambuk: formattedStambuk } });
  if (existing) return { error: "Stambuk ini sudah terdaftar di sistem!" };

  try {
    const hashedPassword = await bcrypt.hash(passwordRaw || "santri123", 10);
    
    const namaFix = excelData["Nama"] || "Santri Tanpa Nama";
    const finalDivisi = divisiInput || "Belum Ada Divisi";

    await prisma.user.create({
      data: {
        stambuk: formattedStambuk,
        name: namaFix,
        role: "SANTRI",
        kelas: excelData["Kelas"],
        password: hashedPassword,
        level: 1,
        divisi: finalDivisi,
        rank: "NOVICE",
        xp: 0 // Pastikan field XP ada di schema kalau mau dipakai
      }
    });

    revalidatePath("/admin/dashboard");
    return { success: `Berhasil mendaftarkan ${namaFix}` };
  } catch (e) {
    console.error("Database Error:", e);
    return { error: "Gagal menyimpan ke database." };
  }
}

function formatToStambukTitik(raw: string | number): string {
    const clean = String(raw).replace(/\./g, "").trim();
    if (clean.length >= 8) {
        return `${clean.substring(0, 1)}.${clean.substring(1, 3)}.${clean.substring(3)}`;
    }
    return clean;
}

export async function logoutAction() {

    const cookieStore = await cookies();

    const token = cookieStore.get("session_token")?.value;


    if (token) {

        const sessionId = await decrypt(token);

        if (sessionId) {

            await redis.del(`session:${sessionId}.darussalam`);

        }
    }
    cookieStore.delete("session_token");
    redirect("/login");

}

export async function deleteSantri(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {

    const target = await prisma.user.findUnique({ where: { id } });
    await prisma.user.delete({ where: { id } });

    revalidatePath("/dashboard/admin");
  } catch (error) {
    console.error("Gagal menghapus santri:", error);
  }
}

export async function updateProfile(formData: FormData) {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name }, 
  });

  const keys = await redis.keys("session:*.darussalam");
  for (const key of keys) {
    const sessionData = await redis.get(key);
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      if (parsed.user.id === userId) {
        parsed.user.name = name; 
        await redis.set(key, JSON.stringify(parsed), "EX", 7200);
      }
    }
  }

  revalidatePath("/dashboard/profile");
}