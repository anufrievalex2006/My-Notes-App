import { userRepo, UserUpdateDto } from "@/entities/user";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

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
            toast.success("Профиль успешно обновлен");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return update;
}