import AddNoteButton from "../components/AddNoteButton";

export default async function Posts({ children }: { children: React.ReactNode }) {
    
    return (
        <main className="p-8 w-full">
            {children}
        </main>
    );
}