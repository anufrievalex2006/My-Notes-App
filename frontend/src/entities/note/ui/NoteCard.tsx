import { Card, CardContent } from "@/components/ui/card";
import { NoteDto } from "../model/note.dto"
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useDeleteNote } from "@/features/note-delete";
import { toast } from "sonner";

interface Props {
    note: NoteDto;
}

const formatDate = (date: string | null): string => {
    const d = dayjs(date).format("DD.MM.YYYY");
    const t = dayjs(date).add(7, "hours").format("HH:mm");
    return `Создано ${d} в ${t}`;
}

export const NoteCard = ({note}: Props) => {
    const nav = useRouter();
    const del = useDeleteNote();
    const onDelete = () => {
        toast("Вы уверены, что хотите удалить эту заметку?", {
            description: "Это действие необратимо!",
            duration: Infinity,
            action: {
                label: "Да",
                onClick: () => del.mutate(note.id)
            },
            cancel: {
                label: "Нет",
                onClick: () => {}
            }
        });
    }
    return (
        <Card className="px-8 py-6 bg-amber-50 shadow-lg cursor-pointer transition-all hover:bg-amber-100 hover:-translate-y-1.5" onClick={
            () => nav.push(`/notes/${note.id}`)
        }>
            <CardContent className="px-0">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl">{note.title}</h2>
                    <div className="flex items-center gap-4">
                        <p className="text-lg text-gray-400">{formatDate(note.createdAt)}</p>
                        <Button className="cursor-pointer" size="lg" variant="destructive" onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}>
                            <IconTrash></IconTrash>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}