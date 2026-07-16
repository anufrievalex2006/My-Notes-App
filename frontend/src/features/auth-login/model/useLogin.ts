import { LoginDto } from "@/entities/user";
import { authRepo } from "@/entities/user/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogin = () => {
    const queryClient = useQueryClient();

    const login = useMutation({
        mutationFn: (req: LoginDto) => authRepo.login(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: (e) => {
            console.error("Ошибка входа в систему", e);
        }
    });

    return login;
}