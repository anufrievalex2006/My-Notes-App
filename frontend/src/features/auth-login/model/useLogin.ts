"use client";

import { LoginDto } from "@/entities/user";
import { authRepo } from "@/entities/user/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const nav = useRouter();
    const queryClient = useQueryClient();

    const login = useMutation({
        mutationFn: (req: LoginDto) => authRepo.login(req),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            localStorage.setItem("token", res.token);
            nav.push("/");
        },
        onError: (e) => {
            console.error("Ошибка входа в систему", e);
        }
    });

    return login;
}