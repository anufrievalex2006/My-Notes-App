import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/entities/user";
import { ProfileUpdateForm } from "@/features/user-update";

export const ProfileMain = () => {
    const {profile, isLoading, error} = useProfile();
    return isLoading ? (
        <h2 className="text-2xl text-blue-400">Пожалуйста, подождите...</h2>
    ) : (error || !profile) ? (
        <h2 className="text-2xl text-destructive">Ошибка загрузки профиля</h2>
    ) : (
        <div className="flex-1 flex flex-col gap-8 items-start">
            <h1 className="text-4xl px-8">Информация о профиле</h1>
            <Card className="w-full mx-auto max-w-3xl px-8 py-6 bg-gray-50 shadow-lg">
                <CardContent className="px-0">
                    <ProfileUpdateForm profile={profile}></ProfileUpdateForm>
                </CardContent>
            </Card>
        </div>
    );
}