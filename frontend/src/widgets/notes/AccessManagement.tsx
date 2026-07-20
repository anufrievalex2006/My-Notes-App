import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNoteAccessesList } from "@/entities/note";
import { GrantAccessForm } from "@/features/note-grant-access/ui/GrantAccessForm";
import { useRevokeAccess } from "@/features/note-revoke-access";
import { X } from "lucide-react";

interface Props {
    noteId: string;
    authorId: string;
}

export const AccessManagement = ({noteId, authorId}: Props) => {
    const {accesses, isLoading} = useNoteAccessesList(noteId);
    const revoke = useRevokeAccess();

    const excludedIds = [authorId, ...(accesses ?? []).map(a => a.userId)];
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Управление доступом</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <GrantAccessForm noteId={noteId} excludeUserIds={excludedIds}></GrantAccessForm>
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Загрузка...</p>
                ) : (accesses && accesses.length > 0) ? (
                    <ul className="flex flex-col gap-2">
                        {accesses.map(a => (
                            <li key={a.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                                <span className="text-sm">{a.username}</span>
                                <Button variant="ghost" size="icon-sm" onClick={
                                    () => revoke.mutate({noteId, userId: a.userId})
                                }>
                                    <X className="size-4"></X>
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">Пока никто не приглашён</p>
                )}
            </CardContent>
        </Card>
    )
}