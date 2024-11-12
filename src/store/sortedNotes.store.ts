import {create, StateCreator} from "zustand";
import {RootResNotes} from "@/types/note.types";

interface wallpaperState {
    notes: RootResNotes[];
}

interface wallpaperActions {
    setNotes: (wallpaperState: RootResNotes[]) => void;
}

const sliceWallpaper: StateCreator<wallpaperState & wallpaperActions> = (setState) => ({
    notes: [],
    setNotes: (value: RootResNotes[]) => {
        setState({notes: value});
    }
})


export const useNotesStore = create<wallpaperState & wallpaperActions>(sliceWallpaper);