import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/features/auth-login"
import { useRouter } from "next/navigation"

export const LoginMain = () => {
    const nav = useRouter();
    return (
        <div className="flex-1 flex justify-center items-start p-8">
            <Card className="w-full max-w-3xl px-8 py-6">
                <CardHeader className="px-0">
                    <CardTitle>Войти в систему</CardTitle>
                    <CardDescription>
                        Введите свой никнейм и пароль для входа в систему
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" className="cursor-pointer text-blue-500 font-bold" onClick={
                            () => nav.push("/register")
                        }>Нет аккаунта? Зарегистрироваться</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="mt-4 px-0">
                    <LoginForm></LoginForm>
                </CardContent>
            </Card>
        </div>
    )
}