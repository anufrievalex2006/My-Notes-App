import { createNoteSchema } from "@/features/note-create";
import z from "zod";

export const updateNoteSchema = createNoteSchema;

export type UpdateNoteFormValues = z.infer<typeof updateNoteSchema>;