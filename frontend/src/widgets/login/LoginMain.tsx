import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
                    <form>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nickname">Никнейм</Label>
                                <Input id="nickname" required></Input>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Пароль</Label>
                                <Input id="password" type="password" required></Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="px-0">
                    <Button type="submit" className="w-full bg-blue-500 cursor-pointer hover:bg-blue-900">Войти в систему</Button>
                </CardFooter>
            </Card>
        </div>
    )
}