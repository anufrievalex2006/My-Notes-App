import { Card, CardContent } from "@/components/ui/card"
import { NoteCreateForm } from "@/features/note-create"

export const CreateNoteMain = () => {
    return (
        <div className="flex-1 flex flex-col gap-16 items-start px-16">
            <h1 className="text-4xl">Создание заметки</h1>
            <Card className="w-full mx-auto px-8 py-6 bg-gray-50 shadow-lg">
                <CardContent className="px-0">
                    <NoteCreateForm></NoteCreateForm>
                </CardContent>
            </Card>
        </div>
    )
}