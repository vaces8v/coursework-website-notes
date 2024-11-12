import {create, StateCreator} from "zustand";
import {persist} from "zustand/middleware";


type valueWallpaper = 'bg-coast' | 'bg-darkForest' | 'bg-earthNight' | 'bg-forest' | 'bg-macos' | 'bg-orbit' | 'bg-planet' | 'bg-water' | 'bg-coast2'

interface wallpaperState {
    value: valueWallpaper;
}

interface wallpaperActions {
    changeWallpaper: (wallpaperState: valueWallpaper) => void;
}

const sliceWallpaper: StateCreator<wallpaperState & wallpaperActions, [["zustand/persist", unknown]]> = (setState) => ({
    value: 'bg-coast',
    changeWallpaper: (wallpaperState: valueWallpaper) => {
        setState({value: wallpaperState});
    }
})


export const useWallpaperStore = create<wallpaperState & wallpaperActions, [["zustand/persist", unknown]]>(persist(sliceWallpaper, {
    name: 'wallpaper',
}));