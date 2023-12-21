import { menuChildrens } from "@/store/types/menuTypes";
import { setRoutes } from "./index";
import { RouteRecordRaw } from "vue-router";

let mouldes = import.meta.glob("../views/**/*.vue");

//动态路由
/**
 * 生成子路由数组
 * @param param 后端返回的菜单
 * @returns 
 */
export const GeneratorRouter = (param:menuChildrens[])=>{
    let tempRoutes:Array<RouteRecordRaw> = [];
    param.forEach((m:menuChildrens,inx:number)=>{
        const reschildrenPaths = m.path.split('/');
        const childrenPaths = reschildrenPaths.reverse();
        let routeItem = {
                            path:childrenPaths[0],
                            name:m.path,
                            component:mouldes[`../views/${m.component}.vue`]?mouldes[`../views/${m.component}.vue`]:mouldes[`../views/exception/404.vue`],
                            meta:{title:m.name},
                            children: []
                            }
        if(m.children.length>0){
            const childrenRoute:Array<RouteRecordRaw> = GeneratorRouter(m.children);
            routeItem.path = "index";
            routeItem.name = childrenPaths[0]+"index";
            childrenRoute.push(routeItem);
            tempRoutes[inx] = {
                                path:childrenPaths[0],
                                name:m.path,
                                meta:{title:m.name},
                                component:mouldes[`../views/baseLayout/JLBaseBody.vue`],
                                children: childrenRoute
                                };
            if('' != m.component) { 
                tempRoutes[inx].redirect = m.path+"/"+routeItem.path  
            }                     
        }else{
            tempRoutes[inx] = routeItem;
        }
    }); 
    return tempRoutes;
}
export const GeneratorRouterOfLogin = (param:menuChildrens[])=>{
    const tempRoutes:Array<RouteRecordRaw> = GeneratorRouter(param);
    setRoutes(tempRoutes);
}

export const GeneratorRouterOfSlider = (param:menuChildrens[])=>{
    const tempRoutes:Array<RouteRecordRaw> = GeneratorRouter(param);
    setRoutes(tempRoutes);
}