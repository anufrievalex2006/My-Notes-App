import { api } from "@/shared/api/axiosInstance";
import { NoteCreateDto, NoteDto, NoteUpdateDto } from "../model/note.dto";

export interface INoteRepo {
    get(): Promise<NoteDto[]>;
    getShared(): Promise<NoteDto[]>;
    getPublic(): Promise<NoteDto[]>;
    getById(id: string): Promise<NoteDto>;
    create(req: NoteCreateDto): Promise<NoteDto>;
    update(id: string, req: NoteUpdateDto): Promise<NoteDto>;
    delete(id: string): Promise<void>;
}

class AxiosNoteApi implements INoteRepo {
    async get(): Promise<NoteDto[]> {
        const res = await api.get<NoteDto[]>("/notes");
        return res.data;
    }
    async getShared(): Promise<NoteDto[]> {
        const res = await api.get<NoteDto[]>("/notes/shared");
        return res.data;
    }
    async getPublic(): Promise<NoteDto[]> {
        const res = await api.get<NoteDto[]>("/notes/public");
        return res.data;
    }
    async getById(id: string): Promise<NoteDto> {
        const res = await api.get<NoteDto>(`/notes/${id}`);
        return res.data;
    }
    async create(req: NoteCreateDto): Promise<NoteDto> {
        const res = await api.post<NoteDto>("/notes", req);
        return res.data;
    }
    async update(id: string, req: NoteUpdateDto): Promise<NoteDto> {
        const res = await api.put<NoteDto>(`/notes/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/notes/${id}`);
    }
}

export const noteRepo: INoteRepo = new AxiosNoteApi();