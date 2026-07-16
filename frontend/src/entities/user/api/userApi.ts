import { api } from "@/shared/api/axiosInstance";
import { UserDto, UserPublicDto, UserUpdateDto } from "../model/user.dto";

export interface IUserRepo {
    get(): Promise<UserPublicDto[]>;
    getById(id: string): Promise<UserPublicDto>;
    getProfile(): Promise<UserDto>;
    updateProfile(req: UserUpdateDto): Promise<UserDto>;
}

class AxiosUserApi implements IUserRepo {
    async get(): Promise<UserPublicDto[]> {
        const res = await api.get<UserPublicDto[]>("/users");
        return res.data;
    }
    async getById(id: string): Promise<UserPublicDto> {
        const res = await api.get<UserPublicDto>(`/users/${id}`);
        return res.data;
    }
    async getProfile(): Promise<UserDto> {
        const res = await api.get<UserDto>("/users/me");
        return res.data;
    }
    async updateProfile(req: UserUpdateDto): Promise<UserDto> {
        const res = await api.put<UserDto>("/users/me", req);
        return res.data;
    }
}

export const userRepo: IUserRepo = new AxiosUserApi();