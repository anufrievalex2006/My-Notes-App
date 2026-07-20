import { NoteDto } from "@/entities/note/model/note.dto";

export interface UserDto {
    id: string;
    username: string;
    avatarUrl: string;
    createdAt: string;
    notes: NoteDto[];
}

export interface UserPublicDto {
    id: string;
    username: string;
    avatarUrl: string;
}

export interface UserUpdateDto {
    username: string;
    avatarUrl?: string | null;
}