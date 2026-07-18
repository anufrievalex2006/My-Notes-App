import { Header } from "@/widgets/Header"
import { CreateNoteMain } from "@/widgets/notes/create/CreateNoteMain"

export const CreateNotePage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <CreateNoteMain></CreateNoteMain>
        </div>
    )
}