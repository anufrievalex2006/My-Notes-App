import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const Main = () => {
    const nav = useRouter();
    return (
        <div className="flex-1 flex justify-center items-start px-8">
            <div className="flex justify-between flex-1 px-8">
                <h1 className="text-4xl">Мои заметки</h1>
                <Button className="py-5 px-4 bg-blue-500 hover:bg-blue-900 cursor-pointer" onClick={
                    () => nav.push("/notes/create")
                }>
                    <IconPlus></IconPlus> Добавить заметку
                </Button>
            </div>
        </div>
    )
}