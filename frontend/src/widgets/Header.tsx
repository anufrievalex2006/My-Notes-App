"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProfile } from "@/entities/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Header = () => {
    const nav = useRouter();
    const {profile, isLoading} = useProfile();
    const onLogout = () => {
        localStorage.removeItem("token");
        nav.push("/login");
    }
    return (
        <header className="py-6 px-8 flex justify-between items-center bg-blue-400 flex-nowrap">
            <h1 className="text-3xl text-blue-50">Заметки v2.0</h1>
            {isLoading ? null : profile ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="text-[20px] text-blue-50 hover:text-blue-900">
                            {profile.username}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => nav.push("/profile")}>
                            Профиль
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onLogout}>
                            Выйти
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant="ghost" onClick={() => nav.push("/login")} className="text-[20px] text-blue-50 hover:text-blue-900 cursor-pointer">
                    Войти
                </Button>
            )}
        </header>
    )
}