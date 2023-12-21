import { createRouter, createWebHistory ,RouteRecordRaw } from "vue-router";
import { menuChildrens } from '@/store/types/menuTypes';
import { useRoutesStore } from '@/store/routesStore';
import { GeneratorRouter } from './routerGenerator';
import { getDynamicRouters } from "@/apis/rolemenuApi";
import { historyRoutesItem } from "@/store/types/routesType";

/**
 * 静态路由
 * {
        path: "system",
        name: "/system",
        children:[{
            path:'xxxx',
            name:"/system/xxxx",
            component: ()=>import("@/views/xxxx/xxx.vue")
        }]
    }
 * 
 */
const routes:Array<RouteRecordRaw> = [
    {   path: '/',
        name: '/',
        component: ()=>import("@/views/home/index.vue"),
        children:[]
    },
    {
        path: "/login",
        component: ()=>import("@/views/login/index.vue")
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('../views/exception/404.vue'),
        meta: { show: false },
    }
]
const router = createRouter({history: createWebHistory(),routes});
/**
 * 
 * @returns isRefresh 浏览器是否被刷新了
 */
const IsRefresh = ()=>{
    const routes = router.getRoutes();
    let isRefresh = false;
    routes.forEach(itm=>{
        //根据是否有子路由来判断是否为刷新
        if('/'==itm.name&&(itm.children.length<=0)){
            isRefresh = true;
        }
    })
    return isRefresh;
}
/**
 * 设置动态路由
 * @param tempRoutes '/'下的子路由
 */
export const setRoutes = (tempRoutes:Array<RouteRecordRaw>)=>{
    router.removeRoute('/');
    router.addRoute({
        path:"/",
        name:"/",
        component:()=>import(`../views/home/index.vue`),
        children:tempRoutes
    });
}
/**
 * 全局路由守卫
 */
router.beforeEach(async (to,_from,next)=>{
    const token = window.sessionStorage.getItem("token");
    const routeStore = useRoutesStore();
    let tempRoute:historyRoutesItem = {meta:{},path:''};
    if(to.path) tempRoute.path = to.path;
    if(to.meta.title) tempRoute.meta = to.meta;
    if((token && token !== '')) {
        const isRefresh = IsRefresh();
        //是否被刷新
        if(isRefresh){
            //获取sessionStorage的路由
            let menusString = window.sessionStorage.getItem("menus");
            let menuChildrens:Array<menuChildrens> = [];
            let chilrenRoutes:Array<RouteRecordRaw> = [];
            if(menusString!=null){
                 menuChildrens = JSON.parse(menusString);       
            }else{
                menuChildrens = await getDynamicRouters().then();
            }
            chilrenRoutes = GeneratorRouter(menuChildrens);
            setRoutes(chilrenRoutes);
            //重新跳转
            next({...to,replace: true}); 
        }else{
            routeStore.setHistoryRoutes(tempRoute);
            next();
        }
    }else if('/login' == to.path){ 
        next();
    }else{
        next({ path: "/login"});
    }
})

export default router;