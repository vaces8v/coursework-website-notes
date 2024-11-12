import {ITag} from "@/types/tag.types";

export interface INoteDTO {
    token: string;
    title: string;
    description: string;
    noteTags: INoteTags[]
}

export interface INoteRes {
    id: number;
    title: string;
    description: string;
    isArchive: string;
    authorId: number;
    noteTags: ITag[];
}

export interface RootResNotes{
    id: number;
    title: string;
    description: string;
    isArchive: boolean;
    authorId: number;
    noteTags: NoteTag[];
}

export interface NoteTag {
    noteId: number;
    tagId: number;
    tag: Tag;
}

export interface Tag {
    id: number;
    name: string;
    color: string;
}

interface INoteTags {
    tagId: number;
}