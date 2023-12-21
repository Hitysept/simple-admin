import request from "@/utils/https";

export const getDynamicMenus = () => {
    return request.get(`/role/getDynamicMenus`,{});
}
export const getDynamicRouters = () => {
    return request.get(`/role/getDynamicRouters`,{});
}
export const getMenusList = (param:any) => {
    return request.get(`/role/getMenusList?currPage=${param.currPage}&pageSize=${param.pageSize}`,{});
}

export const getMenusTreeList = () => {
    return request.get(`/role/getMenusTreeList`,{});
}

export const getRoleMenusMap = (param:any) => {
    return request.get(`/role/getRoleMenusMap?roleId=${param.roleId}`,{});
}

export const saveMenu = (param:any) => {
    return request.post(`/role/saveMenu`,param);
}

export const getRoleList = (param:any)=>{
    return request.get(`/role/getRoleList?currPage=${param.currPage}&pageSize=${param.pageSize}`,{});
}

export const saveRoleMenu = (param:any)=>{
    return request.post(`/role/saveRoleMenu`,param);
}