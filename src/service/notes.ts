import {INoteDTO, INoteRes, RootResNotes} from "@/types/note.types";
import {axiosInstance} from "@/service/instance";

export const getAllMy = async (token: string): Promise<RootResNotes[]> => {
    const { data } = await axiosInstance.get<RootResNotes[]>("api/note", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return (await data);
}

export const create = async (body: INoteDTO): Promise<INoteRes> => {
    try {
        const {data} = await axiosInstance.post<INoteRes>("api/note", body);
        return data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
};
