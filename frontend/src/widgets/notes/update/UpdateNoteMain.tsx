import { Card, CardContent } from "@/components/ui/card";
import { useNoteDetails } from "@/entities/note";
import { useProfile } from "@/entities/user";
import { NoteUpdateForm } from "@/features/note-update/ui/NoteUpdateForm";
import { AccessManagement } from "../AccessManagement";

interface Props {
    id: string;
}

export const UpdateNoteMain = ({id}: Props) => {
    const {note} = useNoteDetails(id);
    const {profile} = useProfile();
    const isOwner = !!note && !!profile && note.authorId === profile.id;
    return (
        <div className="flex-1 flex flex-col gap-8 items-start px-16">
            {isOwner && (
                <Card className="w-full mx-auto px-8 py-6 bg-gray-50 shadow-lg">
                    <CardContent className="px-0">
                        <AccessManagement noteId={id} authorId={note.authorId}></AccessManagement>
                    </CardContent>
                </Card>
            )}
            <Card className="w-full mx-auto px-8 py-6 bg-gray-50 shadow-lg">
                <CardContent className="px-0">
                    <NoteUpdateForm id={id}></NoteUpdateForm>
                </CardContent>
            </Card>
        </div>
    )
}