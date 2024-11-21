import {create, StateCreator} from "zustand";
import {persist} from "zustand/middleware";


type valueWallpaper = 'coast' | 'coast2' | 'earthNight' | 'darkForest' | 'macos' | 'orbit' | 'planet' | 'water'

interface wallpaperState {
    value: valueWallpaper;
}

interface wallpaperActions {
    changeWallpaper: (wallpaperState: valueWallpaper) => void;
}

const sliceWallpaper: StateCreator<wallpaperState & wallpaperActions, [["zustand/persist", unknown]]> = (setState) => ({
    value: 'planet',
    changeWallpaper: (wallpaperState: valueWallpaper) => {
        setState({value: wallpaperState});
    }
})


export const useWallpaperStore = create<wallpaperState & wallpaperActions, [["zustand/persist", unknown]]>(persist(sliceWallpaper, {
    name: 'wallpaper',
}));