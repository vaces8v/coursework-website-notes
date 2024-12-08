import {axiosInstance} from "@/service/instance";
import {ITag} from "@/types/tag.types";

interface ResTagDelete {
    ok: boolean;
}

interface ReqTagCreate {
    name: string;
    color: string;
}


export const getAll = async (): Promise<ITag[]> => {
    const {data} = await axiosInstance.get<ITag[]>("/tags");
    return (await data);
}

export const createTag = async (body: ReqTagCreate, token: string) => {
    const {data} = await axiosInstance.post<ITag>(`/tags/`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return (await data);
};

export const removeTag = async (tag_id: number, token: string) => {
    const {data} = await axiosInstance.delete<ResTagDelete>(`/tags/${tag_id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return (await data);
};