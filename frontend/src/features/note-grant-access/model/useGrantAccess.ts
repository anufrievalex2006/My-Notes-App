import { noteAccessRepo } from "@/entities/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    noteId: string;
    userId: string;
}

export const useGrantAccess = () => {
    const queryClient = useQueryClient();

    const grant = useMutation({
        mutationFn: ({noteId, userId}: Props) => noteAccessRepo.grantAccess(noteId, userId),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["notes", vars.noteId, "access"]
            });
        },
        onError: (e) => {
            console.error("Ошибка выдачи доступа к заметке", e);
        }
    });

    return grant;
}