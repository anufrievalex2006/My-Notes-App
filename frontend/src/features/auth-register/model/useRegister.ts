"use client";

import { RegisterDto } from "@/entities/user";
import { authRepo } from "@/entities/user/api/authApi";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
    const nav = useRouter();
    const queryClient = useQueryClient();

    const register = useMutation({
        mutationFn: (req: RegisterDto) => authRepo.register(req),
        onSuccess: () => {
            queryClient.clear();
            nav.push("/");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return register;
}