import { Header } from "@/widgets/Header"
import { ProfileMain } from "@/widgets/profile/ProfileMain"

export const ProfilePage = () => {
    return (
        <div className="max-w-screen min-h-screen flex flex-col gap-8">
            <Header></Header>
            <ProfileMain></ProfileMain>
        </div>
    )
}