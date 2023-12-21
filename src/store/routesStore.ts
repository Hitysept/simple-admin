import {defineStore} from "pinia"
import { routeState,historyRoutesItem } from "@/store/types/routesType";

export const useRoutesStore = defineStore("routes", {
    state: ():routeState=>{
       return {
            historyRoutes: [],
            currentRouterName:""
       } 
    },
    getters:{
        getRoutes: (state)=>{
            return state.historyRoutes;
        }
    },
    actions:{
        setHistoryRoutes(route:historyRoutesItem){
            const localHistory = window.sessionStorage.getItem('historyRoutes');
            if(localHistory&&this.historyRoutes.length==0) this.historyRoutes = JSON.parse(localHistory);
            let currHistoryPath:Array<string> = [];
            this.historyRoutes.forEach((item:historyRoutesItem) => {
                currHistoryPath.push(item.path);
            });
            if(!currHistoryPath.includes(route.path) && route.path != '/' && route.path!= '' && route.path != '/:catchAll(.*)' &&route.meta.title && route.meta.title != ''){
                this.historyRoutes.push(route);
            }
            this.historyRoutes.forEach((item:historyRoutesItem)=>{ 
                item.meta.active = (route.path==item.path);
            })
            if(this.historyRoutes.length>10) { this.historyRoutes.shift() }
            window.sessionStorage.setItem('historyRoutes',JSON.stringify(this.historyRoutes))
        },
        DelHistoryRoutes(path:string){
            this.historyRoutes = this.historyRoutes.filter((item:historyRoutesItem) => {
                return item.path != path;
            });
            window.sessionStorage.setItem('historyRoutes',JSON.stringify(this.historyRoutes))
        },
        setCurrentRouterName(currentRouterName:string){
            this.currentRouterName = currentRouterName;
        }
    }
})