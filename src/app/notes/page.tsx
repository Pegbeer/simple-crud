'use client';
import useSWR, { mutate } from "swr";
import AddNoteButton from "../components/AddNoteButton";
import NotesList, { NoteType } from "../components/NotesList";

const fetcher = async (url: string): Promise<NoteType[]> => {
    const response = await fetch(url); 
    if (!response.ok) {
        const error: any = new Error('Error fetching the data'); 
        error.info = await response.text();
        error.status = response.status; throw error;
    }
    return response.json();
}



export default function Page(){
    const { data, error, mutate } = useSWR<NoteType[]>('/api/notes', fetcher);

    const handleRefresh = async() =>{
        await mutate();
    }
    return (
        <main className="container ">
            <nav className="flex justify-between items-center px-4 py-2">
                <span className="text-2xl font-semibold">Mis notas</span>
                <AddNoteButton mutate={handleRefresh}/>
            </nav>
            <NotesList notes={data}/>
        </main>
    );
}