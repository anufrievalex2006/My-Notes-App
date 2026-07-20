import { noteAccessRepo } from "@/entities/note";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
            toast.success("Отзыв прав прошел успешно");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return revoke;
}