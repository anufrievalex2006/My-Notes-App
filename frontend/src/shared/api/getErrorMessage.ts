import { AxiosError } from "axios"
import { ApiError } from "./ApiError"

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const data = error.response?.data as ApiError | undefined;
        if (data?.validationErrors)
            return Object.values(data.validationErrors).join("; ");

        if (data?.message)
            return data.message;
    }
    return "Произошла непредвиденная ошибка, попробуйте еще раз.";
}