import { useQuery } from "@tanstack/react-query"
import { userRepo } from "../api/userApi"

export const useUserDetails = (id: string) => {
    const {data: user, isLoading, error} = useQuery({
        queryKey: ["users", id],
        queryFn: async () => {
            const res = await userRepo.getById(id);
            return res;
        }
    });

    return {
        user,
        isLoading,
        error
    };
}