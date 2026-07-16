import { noteRepo, NoteUpdateDto } from "@/entities/note";
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UpdateProps {
    id: string;
    req: NoteUpdateDto;
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => noteRepo.update(id, req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            });
        },
        onError: (e) => {
            console.error("Ошибка обновления заметки", e);
        }
    });

    return update;
}