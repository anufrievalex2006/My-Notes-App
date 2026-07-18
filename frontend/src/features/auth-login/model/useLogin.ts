"use client";

import { LoginDto } from "@/entities/user";
import { authRepo } from "@/entities/user/api/authApi";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
    const nav = useRouter();
    const queryClient = useQueryClient();

    const login = useMutation({
        mutationFn: (req: LoginDto) => authRepo.login(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            nav.push("/");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return login;
}