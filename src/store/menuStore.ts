import {defineStore} from "pinia"
import { menuChildrens,menuState } from "@/store/types/menuTypes"

export const useMenuStore = defineStore("menu", {
    state: ():menuState=>{
       return {
            menu: [],
            selectedKeys: [],
       } 
    },
    getters:{
        getMenu: (state)=>{
            return state.menu;
        }
    },
    actions:{
        setMenu(menu:menuChildrens[]){
            this.menu = menu
        },
        setSelectedKeys(selectedKey:string){
            if(!this.selectedKeys.includes(selectedKey)){
                this.selectedKeys[0] = selectedKey;
            }
        }
    }
})