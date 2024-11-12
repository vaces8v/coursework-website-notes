import {IResToken, IUser, LoginDTO, RegisterDTO} from "@/types/user.types";
import {axiosInstance} from "@/service/instance";
import axios from "axios";

export const login = async (body: LoginDTO): Promise<IResToken> => {
    const {data} = await axiosInstance.post<IResToken>("api/user/login", body);
    return (await data);
}

export const register = async (body: RegisterDTO): Promise<IResToken> => {
    const {data} = await axiosInstance.post<IResToken>("api/user", body);
    return (await data);
}

export const getProfile = async (body: IResToken): Promise<IUser> => {
    const {data} = await axios.post<IUser>("http://localhost:3000/api/profile", body);
    return (await data);
}