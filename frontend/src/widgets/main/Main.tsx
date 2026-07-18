import { Button } from "@/components/ui/button"
import { useNotesList } from "@/entities/note";
import { NoteCard } from "@/entities/note";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const Main = () => {
    const nav = useRouter();
    const {notes, isLoading, error} = useNotesList();
    return (
        <div className="flex justify-between flex-col px-16 gap-12">
            <div className="flex justify-between flex-1">
                <h1 className="text-4xl">Мои заметки</h1>
                <Button className="py-5 px-4 bg-blue-500 hover:bg-blue-900 cursor-pointer" onClick={
                    () => nav.push("/notes/create")
                }>
                    <IconPlus></IconPlus> Добавить заметку
                </Button>
            </div>
            {isLoading ? (
                <h2 className="text-2xl text-blue-400 text-center">Пожалуйста, подождите...</h2>
            ) : (error || !notes) ? (
                <h2 className="text-2xl text-destructive text-center">Ошибка загрузки заметок</h2>
            ) : (
                <div className="flex flex-col gap-6">
                    {notes.map(n => (
                        <NoteCard key={n.id} note={n}></NoteCard>
                    ))}
                </div>
            )}
        </div>
    )
}