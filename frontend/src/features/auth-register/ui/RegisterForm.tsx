import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegister } from "../model/useRegister"
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const nav = useRouter();
    const reg = useRegister();
    const form = useForm<RegisterFormValues>({
        defaultValues: {
            username: "",
            password: "",
            avatarUrl: undefined
        },
        resolver: zodResolver(registerSchema)
    });
    const onSubmit = (data: RegisterFormValues) => {
        reg.mutate(data, {
            onSuccess: () => {
                form.reset();
                nav.push("/");
            }
        });
    }
    const errors = form.formState.errors;
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Никнейм</Label>
                    <Input id="username" {...form.register("username")}></Input>
                    {errors.username && (
                        <p className="text-sm text-destructive">{errors.username.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input id="password" type="password" {...form.register("password")}></Input>
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="avatarUrl">URL аватара</Label>
                    <Input id="avatarUrl" {...form.register("avatarUrl")}></Input>
                    {errors.avatarUrl && (
                        <p className="text-sm text-destructive">{errors.avatarUrl.message}</p>
                    )}
                </div>
                <Button type="submit" className="mt-1 w-full bg-blue-500 cursor-pointer hover:bg-blue-900" disabled={reg.isPending}>
                    {reg.isPending ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
            </div>
        </form>
    )
}