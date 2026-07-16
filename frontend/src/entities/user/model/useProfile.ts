import { useQuery } from "@tanstack/react-query"
import { userRepo } from "../api/userApi"

export const useProfile = () => {
    const {data: profile, isLoading} = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await userRepo.getProfile();
            return res;
        }
    });

    return {
        profile,
        isLoading
    };
}