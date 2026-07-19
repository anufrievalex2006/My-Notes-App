import { useUsersList } from "@/entities/user";
import { useState } from "react";
import { useGrantAccess } from "../model/useGrantAccess";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface Props {
    noteId: string;
    excludeUserIds: string[];
}

export const GrantAccessForm = ({noteId, excludeUserIds}: Props) => {
    const [open, setOpen] = useState(false);
    const {users, isLoading} = useUsersList();
    const grant = useGrantAccess();

    const available = (users ?? []).filter(u => !excludeUserIds.includes(u.id));
    const onSelect = (userId: string) => {
        grant.mutate({noteId, userId});
        setOpen(false);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={
                <Button variant="outline" className="w-full justify-between" disabled={isLoading}>
                    Пригласить пользователя
                    <ChevronsUpDown className="opacity-50"></ChevronsUpDown>
                </Button>
            }></PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Введите никнейм пользователя..."></CommandInput>
                    <CommandList>
                        <CommandEmpty>Пользователь не найден</CommandEmpty>
                        <CommandGroup>
                            {available.map(u => (
                                <CommandItem key={u.id} value={u.username} onSelect={
                                    () => onSelect(u.id)
                                }>{u.username}</CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}