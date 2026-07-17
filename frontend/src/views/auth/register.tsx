import { Header } from "@/widgets/Header"
import { RegisterMain } from "@/widgets/register/RegisterMain"

export const RegisterPage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <RegisterMain></RegisterMain>
        </div>
    )
}