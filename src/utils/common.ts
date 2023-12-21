import { menuChildrens,checkListItem } from "@/store/types/menuTypes";
import type { TreeSelectProps } from 'ant-design-vue';
import router from "@/router";
export const toPagePath = (url:string)=>{
    let token = window.localStorage.getItem("token");
    token = token?token:window.sessionStorage.getItem("token");
    if(token){
        router.replace({path: '/login'});
    }else{
        router.push({path: url})
    }
}

export const menuToAntdTree = (menus:Array<menuChildrens>)=>{
    let treeData:TreeSelectProps['treeData'] = [];
    menus.forEach((m:menuChildrens)=>{
        let childrenTree:TreeSelectProps['treeData']= [];
        if(m.children.length>0){
            childrenTree = menuToAntdTree(m.children);
        }
        const tempMenuItem = {
            label: m.name,
            value: m.menuId,
            children: childrenTree
        }
        
        treeData?.push(tempMenuItem);
    });
    return treeData;
}

export const menuToArray = (menus:Array<menuChildrens>)=>{
    let treeData:Array<checkListItem[]> = [];
    menus.forEach((m:menuChildrens)=>{
        let tempMenuItem = [{
            label: m.name,
            value: m.menuId,
            status: m.status
        }]
        if(m.children.length>0){
            let childrenTree:Array<checkListItem[]>= [];
            childrenTree = menuToArray(m.children);
            childrenTree.forEach(itm=>{
                tempMenuItem = tempMenuItem?.concat(itm)
            })
        }
        treeData.push(tempMenuItem);
    });
    return treeData;
}