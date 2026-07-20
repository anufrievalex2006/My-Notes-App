import { Header } from "@/widgets/Header"
import { LoginMain } from "@/widgets/login/LoginMain"

export const LoginPage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <LoginMain></LoginMain>
        </div>
    )
}