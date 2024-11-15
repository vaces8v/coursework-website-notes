import {create, StateCreator} from "zustand";
import {RootResNotes} from "@/types/note.types";

interface notesState {
    notes: RootResNotes[];
}

interface notesActions {
    setNotes: (value: RootResNotes[]) => void;
}

const slice: StateCreator<notesState & notesActions> = (setState) => ({
    notes: [],
    setNotes: (value: RootResNotes[]) => {
        setState({notes: value});
    }
})


export const useNotesStore = create<notesState & notesActions>(slice);