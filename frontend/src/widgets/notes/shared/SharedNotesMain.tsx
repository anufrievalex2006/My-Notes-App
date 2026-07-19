import { NoteCard, useSharedNotesList } from "@/entities/note";

export const SharedNotesMain = () => {
    const {notes, isLoading, error} = useSharedNotesList();
    return (
        <div className="flex justify-between flex-col px-16 gap-12">
            <h1 className="text-4xl">Доступные мне заметки</h1>
            {isLoading ? (
                <h2 className="text-2xl text-blue-400 text-center">Пожалуйста, подождите...</h2>
            ) : (error || !notes) ? (
                <h2 className="text-2xl text-destructive text-center">Ошибка загрузки заметок</h2>
            ) : (notes.length === 0) ? (
                <h2 className="text-2xl text-blue-400 text-center font-bold">Пока нет доступных заметок!</h2>
            ) : (
                <div className="flex flex-col gap-6">
                    {notes.map(n => (
                        <NoteCard key={n.id} note={n} authorId={n.authorId}></NoteCard>
                    ))}
                </div>
            )}
        </div>
    )
}