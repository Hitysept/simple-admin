import request from "@/utils/https";

export const getUserList = ()=>{
    return request.get(`/userInfo/admin/getUsersList`,{});
}