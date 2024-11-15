import {create, StateCreator} from "zustand";
import {persist} from "zustand/middleware";

interface animateState {
    disabledAnimate: boolean;
}

interface animateActions {
    setDisabledAnimate: (value: boolean) => void;
}

const slice: StateCreator<animateState & animateActions, [["zustand/persist", unknown]]> = (setState) => ({
    disabledAnimate: false,
    setDisabledAnimate: (value: boolean) => {
        setState({disabledAnimate: value});
    }
})


export const useAnimateStore = create<animateState & animateActions, [["zustand/persist", unknown]]>(persist(slice, {name: "animate"}));