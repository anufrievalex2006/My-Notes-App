import { NoteCreateDto, noteRepo } from "@/entities/note";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: NoteCreateDto) => noteRepo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            });
        },
        onError: (e) => {
            console.error("Ошибка создания заметки", e);
        }
    });

    return create;
}