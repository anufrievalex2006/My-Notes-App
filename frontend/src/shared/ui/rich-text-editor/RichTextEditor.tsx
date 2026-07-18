"use client";

import { cn } from "@/lib/utils";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";

interface Props {
    value: string;
    onChange: (html: string) => void;
    className?: string;
}

export const RichTextEditor = ({value, onChange, className}: Props) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: value,
        immediatelyRender: false,
        onUpdate: ({editor}) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4"
            }
        }
    });

    return (
        <div className={cn("rounded-md border", className)}>
            <Toolbar editor={editor}></Toolbar>
            <EditorContent editor={editor}></EditorContent>
        </div>
    )
}