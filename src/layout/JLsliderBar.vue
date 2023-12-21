<template>
<div class="slider">
    <div class="logo">
        桑落后台管理系统 
    </div>
    <a-menu class="menu" style="width: 100%" mode="inline" theme="dark" :selectedKeys="reactiveData.selectedKeys">
        <JLmenuItem v-for="items in reactiveData.routes" :items="items"></JLmenuItem> 
    </a-menu>
</div>
</template>
<script lang="ts" setup>
    import { onMounted, reactive,watch} from 'vue';
    import { getDynamicMenus } from "@/apis/rolemenuApi";
    import JLmenuItem from "@/components/JLmenuItem.vue";  
    import { menuChildrens,menuState } from "@/store/types/menuTypes";
    import {  useMenuStore } from "@/store/menuStore";

    interface sliderData {
        routes: Array<menuChildrens>,
        selectedKeys:Array<string>
    }
    const menuStore:menuState = useMenuStore();
    let reactiveData = reactive<sliderData>({
        routes:[],
        selectedKeys:[]
    });
    watch(menuStore.selectedKeys,(newVal,_oldVal)=>{
        reactiveData.selectedKeys = newVal;
    });
    const _init = async ()=>{
        const menuListRes:menuChildrens[] = await getDynamicMenus().then();
        reactiveData.routes = menuListRes;
    }
    onMounted(()=>{
        _init();
     })
</script>
<style scoped>
    .logo {
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #001529;
        color: rgba(255, 255, 255, 0.65);
    }
    .slider {
        width: 100%;     
        background-color: #001529;
    }
</style>