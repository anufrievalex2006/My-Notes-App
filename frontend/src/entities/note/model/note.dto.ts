export interface NoteDto {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    accesses: NoteAccessDto[];
    public: boolean;
}

export interface NoteCreateDto {
    title: string;
    content: string;
    isPublic: boolean;
}

export interface NoteUpdateDto {
    title: string;
    content: string;
    isPublic: boolean;
}

export interface NoteAccessDto {
    id: string;
    noteId: string;
    userId: string;
    grantedAt: string;
}