import { noteAccessRepo } from "@/entities/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    noteId: string;
    userId: string;
}

export const useRevokeAccess = () => {
    const queryClient = useQueryClient();

    const revoke = useMutation({
        mutationFn: ({noteId, userId}: Props) => noteAccessRepo.revokeAccess(noteId, userId),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["notes", vars.noteId, "access"]
            });
        },
        onError: (e) => {
            console.error("Ошибка отзыва доступа", e);
        }
    });

    return revoke;
}