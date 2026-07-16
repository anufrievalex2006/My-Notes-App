import { noteRepo } from "../api/noteApi";
import { useQuery } from "@tanstack/react-query"

export const useNoteDetails = (id: string) => {
    const {data: note, isLoading} = useQuery({
        queryKey: ["notes", id],
        queryFn: async () => {
            const res = await noteRepo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        note,
        isLoading
    };
}