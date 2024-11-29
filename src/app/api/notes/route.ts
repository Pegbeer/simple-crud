import { NextResponse } from "next/server";
import { Database } from "@/lib/Database";

const db = Database.getInstance();

export async function GET(req:Request) {
    const notes = await db.note.findMany();
    return NextResponse.json(notes);
}

export async function POST(request:Request) {
    const payload = await request.json();
    
    const newNote = await db.note.create({
        data:{
            title: payload.title,
            content: payload.content
        }
    });

    return NextResponse.json(newNote);
}