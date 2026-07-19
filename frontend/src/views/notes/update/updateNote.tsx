import { Header } from "@/widgets/Header"
import { UpdateNoteMain } from "@/widgets/notes/update/UpdateNoteMain"

interface Props {
    id: string;
}

export const UpdateNotePage = ({id}: Props) => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <UpdateNoteMain id={id}></UpdateNoteMain>
        </div>
    )
}