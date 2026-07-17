import { noteRepo } from "@/entities/note";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const del = useMutation({
        mutationFn: (id: string) => noteRepo.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            });
            toast.success("Заметка успешно удалена");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return del;
}