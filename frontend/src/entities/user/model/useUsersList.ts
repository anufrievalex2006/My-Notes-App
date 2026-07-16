import { userRepo } from "../api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useUsersList = () => {
    const {data: users, isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await userRepo.get();
            return res;
        }
    });

    return {
        users,
        isLoading
    };
}