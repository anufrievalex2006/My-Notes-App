import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile, UserDto } from "@/entities/user"
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ProfileUpdateFormValues, profileUpdateSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "../model/useUpdateProfile";
import { useEffect } from "react";

interface Props {
    profile: UserDto;
}

export const ProfileUpdateForm = ({profile}: Props) => {
    const update = useUpdateProfile();
    const form = useForm<ProfileUpdateFormValues>({
        defaultValues: {
            username: "",
            avatarUrl: undefined
        },
        resolver: zodResolver(profileUpdateSchema)
    });
    const onSubmit = (data: ProfileUpdateFormValues) => {
        update.mutate(data);
    }
    useEffect(() => {
        if (profile) {
            form.reset({
                username: profile.username,
                avatarUrl: profile.avatarUrl
            });
        }
    }, [form, profile]);
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
                <Label htmlFor="username">Никнейм</Label>
                <Input id="username" {...form.register("username")} className="bg-white"></Input>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 md:gap-8 my-4">
                <div className="grid gap-2 flex-1">
                    <Label htmlFor="avatarUrl">Ссылка на аватар</Label>
                    <Input id="avatarUrl" {...form.register("avatarUrl")} className="bg-white"></Input>
                </div>
                <Image alt={profile.username} src={profile.avatarUrl || noImage.src} width={100} height={100}></Image>
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-900 cursor-pointer">Обновить сведения о профиле</Button>
        </form>
    )
}