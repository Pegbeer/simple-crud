"use server"
import { NoteType } from "../components/NotesList";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function AddNote(type:NoteType){
    const response = await fetch(`${apiUrl}/api/notes`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(type)
    });

    const newTodo = await response.json();
    console.log(newTodo);
}