import {create, StateCreator} from "zustand";
import {RootResNotes} from "@/types/note.types";

interface notesState {
    notesSorted: RootResNotes[];
}

interface notesActions {
    setNotesSorted: (value: RootResNotes[]) => void;
}

const slice: StateCreator<notesState & notesActions> = (setState) => ({
    notesSorted: [],
    setNotesSorted: (value: RootResNotes[]) => {
        setState({notesSorted: value});
    }
})


export const useSortedNotesStore = create<notesState & notesActions>(slice);