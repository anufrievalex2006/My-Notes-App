import { useQuery } from "@tanstack/react-query"
import { noteRepo } from "../api/noteApi"

export const usePublicNotesList = () => {
    const {data: notes, isLoading, error} = useQuery({
        queryKey: ["notes", "public"],
        queryFn: async () => {
            const res = await noteRepo.getPublic();
            return res;
        }
    });

    return {
        notes,
        isLoading,
        error
    };
}