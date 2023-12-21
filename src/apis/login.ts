import request from "@/utils/https";

export const login = (params:any) => {
    return request.post(`/oauth/login`,params)
}