import {INoteDTO, INoteRes, INoteUpdateDTO, RootResNotes} from "@/types/note.types";
import {axiosInstance} from "@/service/instance";

export const getAllMy = async (token: string): Promise<RootResNotes[]> => {
    const { data } = await axiosInstance.get<RootResNotes[]>("/notes/", {
        headers: { Authorization: `Bearer ${token}`},
    });
    return data;
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
        console.error("Error creating note:", error);
        throw error;
    }
};

export const update = async (noteId: number, body: INoteUpdateDTO, token: string): Promise<INoteRes> => {
    try {
        const {data} = await axiosInstance.put<INoteRes>(`/notes/${noteId}`, body, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return data;
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
};

export const exportToExcel = async (token: string): Promise<void> => {
    try {
        const { data } = await axiosInstance.get<Blob>("/notes/export/excel", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        const url = window["URL"].createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `notes_export_${new Date().toISOString()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window["URL"].revokeObjectURL(url);
    } catch (error) {
        console.error("Error exporting notes:", error);
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
        console.error("Error deleting note:", error);
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
        console.error("Error adding to archive:", error);
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
        console.error("Error removing from archive:", error);
        throw error;
    }
}

