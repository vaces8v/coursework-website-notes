import {Tag} from "@/types/note.types";

export interface PropsNoteCard {
    id: number;
    title: string;
    description: string;
    tags: Tag[];
}