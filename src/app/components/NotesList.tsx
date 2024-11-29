import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface NoteType {
    id: string,
    title: string,
    content: string
}

export default function NotesList({notes}:{notes:NoteType[]|undefined}) {
    return (
        <ul className="flex flex-wrap gap-3 mt-3">
            {
                notes?.map((it) => (
                    <Card key={it.id} className="max-w-[350px] min-w-[250px]">
                        <CardHeader>
                            <CardTitle>{it.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="overflow-hidden break-words">
                                {it.content}
                            </p>
                        </CardContent>
                    </Card>
                ))
            }
        </ul>
    );
}
