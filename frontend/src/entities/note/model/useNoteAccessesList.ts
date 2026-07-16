import { useQuery } from "@tanstack/react-query"
import { noteAccessRepo } from "../api/noteAccessApi"

export const useNoteAccessesList = (noteId: string) => {
    const {data: accesses, isLoading, error} = useQuery({
        queryKey: ["notes", noteId, "access"],
        queryFn: async () => {
            const res = await noteAccessRepo.getForNote(noteId);
            return res;
        },
        enabled: !!noteId,
        retry: false
    });

    return {
        accesses,
        isLoading,
        error
    }
}