import { api } from "@/shared/api/axiosInstance";
import { NoteAccessDto } from "../model/note.dto";

export interface INoteAccessRepo {
    getForNote(noteId: string): Promise<NoteAccessDto[]>;
    grantAccess(noteId: string, userId: string): Promise<NoteAccessDto>;
    revokeAccess(noteId: string, userId: string): Promise<void>;
}

class AxiosNoteAccessApi implements INoteAccessRepo {
    async getForNote(noteId: string): Promise<NoteAccessDto[]> {
        const res = await api.get<NoteAccessDto[]>(`/notes/${noteId}/access`);
        return res.data;
    }
    async grantAccess(noteId: string, userId: string): Promise<NoteAccessDto> {
        const res = await api.post<NoteAccessDto>(`/notes/${noteId}/access/${userId}`);
        return res.data;
    }
    async revokeAccess(noteId: string, userId: string): Promise<void> {
        await api.delete(`/notes/${noteId}/access/${userId}`);
    }
}

export const noteAccessRepo: INoteAccessRepo = new AxiosNoteAccessApi();