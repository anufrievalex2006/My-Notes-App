import { Label } from "@/components/ui/label";
import { useCreateNote } from "../model/useCreateNote"
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { CreateNoteFormValues, createNoteSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/shared/ui/rich-text-editor/RichTextEditor";

export const NoteCreateForm = () => {
    const nav = useRouter();
    const create = useCreateNote();
    const form = useForm<CreateNoteFormValues>({
        defaultValues: {
            title: "",
            content: "",
            isPublic: false
        },
        resolver: zodResolver(createNoteSchema)
    });
    const onSubmit = (data: CreateNoteFormValues) => {
        create.mutate(data, {
            onSuccess: () => {
                form.reset();
                nav.push("/");
            }
        });
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="title" className="text-xl">Заголовок</Label>
                    <Input id="title" {...form.register("title")} className="h-12 bg-white border-gray-300"></Input>
                </div>
                <div className="flex items-center gap-2">
                    <Controller control={form.control} name="isPublic" render={({field}) => (
                        <Switch id="isPublic" size="default" checked={field.value} onCheckedChange={field.onChange}></Switch>
                    )}></Controller>
                    <Label htmlFor="isPublic" className="text-lg font-light">Сделать заметку публичной?</Label>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="content" className="text-xl">Содержимое заметки</Label>
                    <Controller control={form.control} name="content" render={({field}) => (
                        <RichTextEditor value={field.value} onChange={field.onChange}></RichTextEditor>
                    )}></Controller>
                </div>
                <div className="flex gap-8">
                    <Button type="submit" className="flex-1 px-5 py-6 cursor-pointer bg-blue-500 hover:bg-blue-900">Добавить заметку</Button>
                    <Button type="reset" variant="outline" className="flex-1 px-5 py-6 cursor-pointer text-blue-500 border-blue-500 hover:bg-blue-300">Отмена</Button>
                </div>
            </div>
        </form>
    )
}