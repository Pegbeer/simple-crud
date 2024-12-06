"use server"
import { PrismaClient } from "@prisma/client";
import { NoteType } from "../components/NotesList";
import { error } from "console";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const prisma = new PrismaClient();

export async function AddNote(type: NoteType) {
    const response = await fetch(`${apiUrl}/api/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    });

    const newTodo = await response.json();
    console.log(newTodo);
}

export async function GetProviders() {
    return await prisma.providers.findMany();
}