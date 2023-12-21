import { RouteMeta } from "vue-router"

export interface routeState {
    historyRoutes: Array<historyRoutesItem>,
    currentRouterName:string
 }
 export interface historyRoutesItem {
    meta: RouteMeta,
    path:string
 }