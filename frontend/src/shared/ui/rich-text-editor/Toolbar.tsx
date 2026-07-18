"use client";

import { Button } from "@/components/ui/button";
import { type Editor } from "@tiptap/react";
import "@tiptap/starter-kit";
import { Bold, Italic, Underline, List, ListOrdered, Heading2, Heading1 } from "lucide-react";

interface Props {
    editor: Editor | null;
}

export const Toolbar = ({editor}: Props) => {
    if (!editor) return null;

    return (
        <div className="flex gap-1 border-b p-2">
            <Button type="button" variant={
                editor.isActive("bold") ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleBold().run()
            }>
                <Bold className="size-4"></Bold>
            </Button>
            <Button type="button" variant={
                editor.isActive("italic") ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleItalic().run()
            }>
                <Italic className="size-4"></Italic>
            </Button>
            <Button type="button" variant={
                editor.isActive("underline") ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleUnderline().run()
            }>
                <Underline className="size-4"></Underline>
            </Button>
            <Button type="button" variant={
                editor.isActive("heading", {level: 1}) ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleHeading({level: 1}).run()
            }>
                <Heading1 className="size-4"></Heading1>
            </Button>
            <Button type="button" variant={
                editor.isActive("heading", {level: 2}) ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleHeading({level: 2}).run()
            }>
                <Heading2 className="size-4"></Heading2>
            </Button>
            <Button type="button" variant={
                editor.isActive("bulletList") ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleBulletList().run()
            }>
                <List className="size-4"></List>
            </Button>
            <Button type="button" variant={
                editor.isActive("orderedList") ? "secondary" : "ghost"
            } size="icon-sm" onClick={
                () => editor.chain().focus().toggleOrderedList().run()
            }>
                <ListOrdered className="size-4"></ListOrdered>
            </Button>
        </div>
    )
}