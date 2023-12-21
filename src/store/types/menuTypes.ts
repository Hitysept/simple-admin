export interface menuChildrens {
    name:string,
    parentId:string,
    menuType:string,
    path:string,
    component:string,
    requestUrl:string,
    menuCode:string,
    roleId:string,
    menuId:string,
    status:number,
    redirect?:string,
    children: menuChildrens[]
}
export interface menuChildren {

}

export interface menuState {
   menu: menuChildrens[],
   selectedKeys:string[]
}

export interface checkListItem {
    label:string,
    value:string,
    status:number
}