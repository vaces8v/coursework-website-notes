import {create, StateCreator} from "zustand";
import {persist} from "zustand/middleware";

interface tokenState {
    token: string;
}

interface tokenActions {
    setToken: (value: string) => void;
}

const sliceWallpaper: StateCreator<tokenState & tokenActions, [["zustand/persist", unknown]]> = (setState) => ({
    token: "",
    setToken: (value: string) => {
        setState({token: value});
    }
})


export const useTokenStore = create<tokenState & tokenActions, [["zustand/persist", unknown]]>(persist(sliceWallpaper, {
    name: 'token',
}));