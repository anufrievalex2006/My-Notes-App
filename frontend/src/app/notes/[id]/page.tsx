"use client";

import { UpdateNotePage } from "@/views/notes/update/updateNote";
import { use } from "react";

interface Props {
    params: Promise<{id: string}>;
}

export default function UpdateNoteRoute({params}: Props) {
    const {id} = use(params);
    return <UpdateNotePage id={id}></UpdateNotePage>
}