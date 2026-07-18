import { api } from "@/shared/api/axiosInstance";
import { LoginDto, RegisterDto, TokenResponse } from "../model/auth.dto";

export interface IAuthRepo {
    register(req: RegisterDto): Promise<void>;
    login(req: LoginDto): Promise<void>;
    logout(): Promise<void>;
}

class AxiosAuthApi implements IAuthRepo {
    async register(req: RegisterDto): Promise<void> {
        await api.post("/auth/register", req);
    }
    async login(req: LoginDto): Promise<void> {
        await api.post("/auth/login", req);
    }
    async logout(): Promise<void> {
        await api.post("/auth/logout");
    }
}

export const authRepo: IAuthRepo = new AxiosAuthApi();