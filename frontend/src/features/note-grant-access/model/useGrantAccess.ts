import { noteAccessRepo } from "@/entities/note";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
            toast.success("Права успешно выданы");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return grant;
}