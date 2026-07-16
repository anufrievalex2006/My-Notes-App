import { noteRepo } from "@/entities/note";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const del = useMutation({
        mutationFn: (id: string) => noteRepo.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            });
        },
        onError: (e) => {
            console.error("Ошибка удаления заметки", e);
        }
    });

    return del;
}