import { useQuery } from "@tanstack/react-query"
import { noteRepo } from "../api/noteApi"

export const useSharedNotesList = () => {
    const {data: notes, isLoading, error} = useQuery({
        queryKey: ["notes", "shared"],
        queryFn: async () => {
            const res = await noteRepo.getShared();
            return res;
        }
    });

    return {
        notes,
        isLoading,
        error
    };
}