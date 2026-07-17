import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from "@/features/auth-register"
import { useRouter } from "next/navigation"

export const RegisterMain = () => {
    const nav = useRouter();
    return (
        <div className="flex-1 flex justify-center items-start p-8">
            <Card className="w-full max-w-3xl px-8 py-6">
            <CardHeader className="px-0">
                    <CardTitle>Регистрация</CardTitle>
                    <CardDescription>
                        Введите свои данные для регистрации (никнейм, пароль, по желанию можно поставить аватарку через URL)
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" className="cursor-pointer text-blue-500 font-bold" onClick={
                            () => nav.push("/login")
                        }>Уже есть аккаунт? Войти</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="mt-4 px-0">
                    <RegisterForm></RegisterForm>
                </CardContent>
            </Card>
        </div>
    )
}