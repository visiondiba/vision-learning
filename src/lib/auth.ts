import { jwtVerify ,SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redis } from "./redis";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(sessionId: string) {
   return await new SignJWT({ sid: sessionId })
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret)
}

export async function decrypt(token: string) {
    try {
        const {payload} = await jwtVerify(token, secret, {
            algorithms: ["HS256"]
        });

        return payload.sid as string;
    } catch (e) {
        return e;
    }
}


export async function withAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) redirect("/login");

    const sessionId = await decrypt(token);
    if (!sessionId) redirect("/login");

    const sessionData = await redis.get(`session:${sessionId}.darussalam`);
    if (!sessionData) redirect("/login");

    const data = JSON.parse(sessionData);

    return data.user;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  try {
    const sessionId = await decrypt(token); 
    const sessionData = await redis.get(`session:${sessionId}.darussalam`);
    if (!sessionData) return null;

    return JSON.parse(sessionData).user;
  } catch (e) {
    return e;
  }
}