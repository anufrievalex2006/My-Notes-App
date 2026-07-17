import { Header } from "@/widgets/Header"
import { Main } from "@/widgets/main/Main"

export const MainPage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <Main></Main>
        </div>
    )
}