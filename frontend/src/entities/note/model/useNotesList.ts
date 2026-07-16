import { useQuery } from "@tanstack/react-query"
import { noteRepo } from "../api/noteApi";

export const useNotesList = () => {
    const {data: notes, isLoading} = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const res = await noteRepo.get();
            return res;
        }
    });

    return {
        notes,
        isLoading
    };
}