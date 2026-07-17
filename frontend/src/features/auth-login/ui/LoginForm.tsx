import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useLogin } from "../model/useLogin"
import { useForm } from "react-hook-form"
import { LoginFormValues, loginSchema } from "../model/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { log } from "console"

export const LoginForm = () => {
    const nav = useRouter();
    const login = useLogin();
    const form = useForm<LoginFormValues>({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = (data: LoginFormValues) => {
        login.mutate(data, {
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
                <Button type="submit" className="mt-1 w-full bg-blue-500 cursor-pointer hover:bg-blue-900" disabled={login.isPending}>
                    {login.isPending ? "Вход..." : "Войти в систему"}
                </Button>
            </div>
        </form>
    )
}