import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function Posts({ children }: { children: React.ReactNode }) {
    return (
        <main className="p-8 w-full">
            <nav className="flex justify-between items-center px-4 py-2 container">
                <span>Publicaciones</span>
                <div className="flex">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size='icon'>
                                <Plus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                                <DialogTitle>Agregar un post</DialogTitle>
                                <DialogDescription>Puedes crear un nuevo post aqui. Asegurate de presionar Guardar antes de cerrar</DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="title" className='text-right'>
                                        Titulo
                                    </Label>
                                    <Input id="title" className='col-span-3' />
                                </div>
                            </div>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="content" className='text-right'>
                                        Contenido
                                    </Label>
                                    <Textarea className='col-span-3' placeholder='Escribe el contenido de tu plublicacion aqui...' />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Publicar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </nav>
            {children}
        </main>
    );
}