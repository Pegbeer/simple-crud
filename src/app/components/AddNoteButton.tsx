'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check, Plus } from "lucide-react";
import { Database } from "@/lib/Database";
import { MouseEventHandler, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { delay } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import AddNote from "../actions/AddNote";


const db = new PrismaClient();

export default function AddNoteButton({mutate}:{mutate:() => void}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpenDialog, setIsOpenDialog] = useState<boolean | undefined>(undefined);

    const onSave = async () => {
        if (title === "" || content === "") {
            setErrorMessage("Debes llenar los campos");
            return;
        }

        setErrorMessage("");

        await AddNote({id:"",title,content});
        mutate();
        setTitle("");
        setContent("");
        setIsOpenDialog(undefined);
    }

    return (
        <div>
            <Dialog open={isOpenDialog}>
                <DialogTrigger asChild>
                    <Button>
                        Crear nota
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Agregar una nota</DialogTitle>
                        <DialogDescription>Puedes crear una nueva nota aqui. Asegurate de presionar Guardar antes de cerrar</DialogDescription>
                    </DialogHeader>
                    {
                        errorMessage != "" ?
                            <Alert variant='destructive'>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Oops!</AlertTitle>
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                            : <></>
                    }
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="title" className='text-right'>
                                Titulo
                            </Label>
                            <Input id="title" className='col-span-3' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                    </div>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="content" className='text-right'>
                                Contenido
                            </Label>
                            <Textarea className='col-span-3' placeholder='Escribe el contenido de tu plublicacion aqui...' value={content} onChange={(e) => { setContent(e.target.value) }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={onSave}>Publicar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
