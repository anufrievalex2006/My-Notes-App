import { userRepo, UserUpdateDto } from "@/entities/user";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: UserUpdateDto) => userRepo.updateProfile(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: (e) => {
            console.error("Ошибка обновления профиля", e);
        }
    });

    return update;
}