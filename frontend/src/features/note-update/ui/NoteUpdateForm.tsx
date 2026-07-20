import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useNoteDetails } from "@/entities/note"
import { RichTextEditor } from "@/shared/ui/rich-text-editor/RichTextEditor"
import { Controller, useForm } from "react-hook-form"
import { UpdateNoteFormValues, updateNoteSchema } from "../model/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateNote } from "../model/useUpdateNote"
import { useEffect } from "react"

interface Props {
    id: string;
}

export const NoteUpdateForm = ({id}: Props) => {
    const {note, isLoading, error} = useNoteDetails(id);
    const update = useUpdateNote();
    const form = useForm<UpdateNoteFormValues>({
        defaultValues: {
            title: "",
            content: "",
            isPublic: false
        },
        resolver: zodResolver(updateNoteSchema)
    });
    const onSubmit = (data: UpdateNoteFormValues) => {
        update.mutate({id, req: data});
    }
    useEffect(() => {
        if (note) {
            form.reset({
                title: note.title,
                content: note.content,
                isPublic: note.public
            });
        }
    }, [note, form]);
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            {isLoading ? (
                <h2 className="text-2xl text-blue-400">Пожалуйста, подождите...</h2>
            ) : (error || !note) ? (
                <h2 className="text-2xl text-destructive">Ошибка загрузки заметки. Возможно, её не существует</h2>
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-xl">Заголовок</Label>
                        <Input id="title" {...form.register("title")} className="h-12 md:text-lg bg-white border-gray-300"></Input>
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
                    <Button type="submit" className="flex-1 px-2 py-4 text-xl cursor-pointer bg-blue-500 hover:bg-blue-900">Обновить заметку</Button>
                </div>
            )}
        </form>
    )
}