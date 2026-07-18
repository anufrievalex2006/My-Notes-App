"use client";

import { authRepo } from "@/entities/user";
import { getErrorMessage } from "@/shared/api/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
    const nav = useRouter();
    const queryClient = useQueryClient();

    const logout = useMutation({
        mutationFn: () => authRepo.logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            nav.push("/login");
        },
        onError: (e) => {
            toast.error(getErrorMessage(e));
        }
    });

    return logout;
}