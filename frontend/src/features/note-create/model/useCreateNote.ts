import { NoteCreateDto, noteRepo } from "@/entities/note";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: NoteCreateDto) => noteRepo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            });
            toast.success("Заметка успешно создана");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return create;
}