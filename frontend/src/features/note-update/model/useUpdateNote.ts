import { noteRepo, NoteUpdateDto } from "@/entities/note";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

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
            toast.success("Заметка успешно обновлена");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return update;
}