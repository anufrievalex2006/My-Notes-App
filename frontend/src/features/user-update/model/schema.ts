import z from "zod";

export const profileUpdateSchema = z.object({
    username: z.string().min(1, "Введите свой никнейм/имя"),
    avatarUrl: z.string().optional()
});

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;