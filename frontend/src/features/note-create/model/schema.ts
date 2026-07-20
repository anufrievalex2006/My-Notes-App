import z from "zod";

export const createNoteSchema = z.object({
    title: z.string().min(1, "Введите заголовок к заметке"),
    content: z.string(),
    isPublic: z.boolean()
});

export type CreateNoteFormValues = z.infer<typeof createNoteSchema>;