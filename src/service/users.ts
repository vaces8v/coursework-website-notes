import {IResToken, IUser, LoginDTO, RegisterDTO} from "@/types/user.types";
import {axiosInstance} from "@/service/instance";
import axios from "axios";

export const login = async (body: LoginDTO): Promise<IResToken> => {
    const {data} = await axiosInstance.post<IResToken>("/users/login/", body);
    return (await data);
}

export const register = async (body: RegisterDTO): Promise<IResToken> => {
    const {data} = await axiosInstance.post<IResToken>("/users/", body);
    return (await data);
}

export const getProfile = async (token: string): Promise<IUser> => {
    const {data} = await axiosInstance.get<IUser>("/users/profile", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return (await data);
}