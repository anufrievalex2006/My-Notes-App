"use client";

import { RegisterDto } from "@/entities/user";
import { authRepo } from "@/entities/user/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useRegister = () => {
    const nav = useRouter();
    const queryClient = useQueryClient();

    const register = useMutation({
        mutationFn: (req: RegisterDto) => authRepo.register(req),
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
            console.error("Ошибка регистрации", e);
        }
    });

    return register;
}