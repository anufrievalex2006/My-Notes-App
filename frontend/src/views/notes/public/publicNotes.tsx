import { Header } from "@/widgets/Header"
import { PublicNotesMain } from "@/widgets/notes/public/PublicNotesMain"

export const PublicNotesPage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <PublicNotesMain></PublicNotesMain>
        </div>
    )
}