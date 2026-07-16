import { api } from "@/shared/api/axiosInstance";
import { LoginDto, RegisterDto, TokenResponse } from "../model/auth.dto";

export interface IAuthRepo {
    register(req: RegisterDto): Promise<TokenResponse>;
    login(req: LoginDto): Promise<TokenResponse>;
}

class AxiosAuthApi implements IAuthRepo {
    async register(req: RegisterDto): Promise<TokenResponse> {
        const res = await api.post<TokenResponse>("/auth/register", req);
        return res.data;
    }
    async login(req: LoginDto): Promise<TokenResponse> {
        const res = await api.post<TokenResponse>("/auth/login", req);
        return res.data;
    }
}

export const authRepo: IAuthRepo = new AxiosAuthApi();