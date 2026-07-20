import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(1, "Введите свой никнейм/имя"),
    password: z.string().min(8, "Пароль должен содержать хотя бы 8 символов"),
    avatarUrl: z.string().optional()
});

export type RegisterFormValues = z.infer<typeof registerSchema>;