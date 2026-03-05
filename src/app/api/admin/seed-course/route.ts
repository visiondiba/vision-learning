import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import next from "next";
import { error } from "console";

export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db("lms_db");

        const newCourse = {
            title: "C++ Engine Development 101",
            description: "Belajar bikin engine pakai Jolt & Diligent",
            instructorId: "clxxxx...", // Ini nanti dari Postgres
            lessons: [
                {
                id: "lesson_1",
                title: "Setup Environment",
                type: "video",
                content: { videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", duration: 600 }
                },
                {
                id: "lesson_2",
                title: "Quiz: Basic Math for Graphics",
                type: "quiz",
                content: {
                    questions: [
                    { question: "Apa itu Dot Product?", options: ["A", "B"], answer: 0 }
                    ]
                }
                }
            ]
            };

            const result = await db.collection("courses").insertOne(newCourse);

            return NextResponse.json({ success: true, id: result.insertedId});
    }
    catch (e) {
            return NextResponse.json({error: (e as Error).message},{ status: 500});
    }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Gunakan POST untuk seeding data, tapi GET ini membuktikan API-mu aktif!" 
  });
}