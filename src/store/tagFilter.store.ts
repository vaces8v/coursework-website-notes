import {create, StateCreator} from "zustand";

interface tagFilterState {
    tagsFilter: number[];
}

interface tagFilterActions {
    setTagsFilter: (value: number[]) => void;
}

const slice: StateCreator<tagFilterState & tagFilterActions> = (setState) => ({
    tagsFilter: [],
    setTagsFilter: (value: number[]) => {
        setState({tagsFilter: value});
    }
})


export const useTagFilterStore = create<tagFilterState & tagFilterActions>(slice);