import { Card, CardContent } from "@/components/ui/card";
import { NoteUpdateForm } from "@/features/note-update/ui/NoteUpdateForm";

interface Props {
    id: string;
}

export const UpdateNoteMain = ({id}: Props) => {
    return (
        <div className="flex-1 flex flex-col gap-16 items-start px-16">
            <Card className="w-full mx-auto px-8 py-6 bg-gray-50 shadow-lg">
                <CardContent className="px-0">
                    <NoteUpdateForm id={id}></NoteUpdateForm>
                </CardContent>
            </Card>
        </div>
    )
}