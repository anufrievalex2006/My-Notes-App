import { Card, CardContent } from "@/components/ui/card";
import { NoteDto } from "../model/note.dto"
import dayjs from "dayjs";

interface Props {
    note: NoteDto;
}

const formatDate = (date: string | null): string => {
    const d = dayjs(date).format("DD.MM.YYYY");
    const t = dayjs(date).add(7, "hours").format("HH:mm");
    return `Создано ${d} в ${t}`;
}

export const NoteCard = ({note}: Props) => {
    return (
        <Card className="px-8 py-6 bg-amber-50 shadow-lg">
            <CardContent className="px-0">
                <div className="flex justify-between">
                    <h2 className="text-2xl">{note.title}</h2>
                    <p className="text-lg text-gray-400">{formatDate(note.createdAt)}</p>
                </div>
            </CardContent>
        </Card>
    )
}