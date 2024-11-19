import {INoteDTO, INoteRes, RootResNotes} from "@/types/note.types";
import {axiosInstance} from "@/service/instance";

export const getAllMy = async (token: string): Promise<RootResNotes[]> => {
    const { data } = await axiosInstance.get<RootResNotes[]>("/notes", {
        headers: { Authorization: `Bearer ${token}`},
    });
    return (await data);
}

export const getAllMyArchives = async (token: string): Promise<RootResNotes[]> => {
    const { data } = await axiosInstance.get<RootResNotes[]>("/notes/archives", {
        headers: { Authorization: `Bearer ${token}`},
    });
    return (await data);
}


export const create = async (body: INoteDTO, token: string): Promise<INoteRes> => {
    try {
        const {data} = await axiosInstance.post<INoteRes>("/notes", body, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return data;
    } catch (error) {
        console.error("Error creating archives:", error);
        throw error;
    }
};


export const deleteNote = async (note_id: number, token: string) => {
    try {
        const {data} = await axiosInstance.delete(`/notes/${note_id}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
    } catch (error) {
        console.error("Error creating archives:", error);
        throw error;
    }
}

export const addToArchive = async (note_id: number, token: string) => {
    try {
        const {data} = await axiosInstance.patch(`/notes/archive/add/${note_id}`, {}, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        return (await data);
    } catch (error) {
        console.error("Error creating archives:", error);
        throw error;
    }
}

export const removeFromArchive = async (note_id: number, token: string) => {
    try {
        const {data} = await axiosInstance.patch(`/notes/archive/remove/${note_id}`,{}, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        return (await data);
    } catch (error) {
        console.error("Error creating archives:", error);
        throw error;
    }
}