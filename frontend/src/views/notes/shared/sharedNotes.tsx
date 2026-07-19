import { Header } from "@/widgets/Header"
import { SharedNotesMain } from "@/widgets/notes/shared/SharedNotesMain"

export const SharedNotesPage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <SharedNotesMain></SharedNotesMain>
        </div>
    )
}