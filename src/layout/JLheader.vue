<template>
    <JLFlex class="header" vertical>
        <JLFlex flex="2" class="JL-flexend" align="center">
            <a-avatar size="large">
                <template #icon><UserOutlined /></template>
            </a-avatar>
        </JLFlex>
        <a-divider style="margin: 0px;"/>
        <JLFlex flex="1" align="center" :style="{'position':'relative'}">
            <div
            class="JL-Tags"
            v-for="itm in pageData.historyRoutesPath" 
            >
                <a-tag 
                :style="{cursor: 'pointer'}" 
                :color="itm.meta.active?'cyan':''" 
                @close="closeTag(itm.path)" 
                @click="toPage(itm.path)"
                @contextmenu="TagsContextMenu"
                closable
                >
                    {{ itm.meta.title }}
                </a-tag>   
            </div>
            <ul v-if="pageData.isShowContextMenu" class="custom-menu">
                <li @click="closeAllTag()">关闭所有菜单</li>
            </ul>
        </JLFlex>
    </JLFlex>
</template>
<script setup lang="ts">
import { useRoutesStore } from '@/store/routesStore';
import { watch, reactive } from 'vue';
import { historyRoutesItem } from '../store/types/routesType';
import { UserOutlined } from '@ant-design/icons-vue';
import router from '../router/index';
interface pageData {
    historyRoutesPath:Array<historyRoutesItem>,
    isShowContextMenu:boolean
}
const routesStroe = useRoutesStore();
const pageData = reactive<pageData>({
    historyRoutesPath:[],
    isShowContextMenu:false
})
const localHistory = window.sessionStorage.getItem('historyRoutes');
if(localHistory) {
    pageData.historyRoutesPath = JSON.parse(localHistory);
}
watch(routesStroe.historyRoutes,(newVal,_oldVal)=>{
    pageData.historyRoutesPath = newVal;
});
const toPage = (path:string)=>{
    router.push(path);
}
const closeTag = (path:string)=>{
    routesStroe.DelHistoryRoutes(path);
}
const closeAllTag = ()=>{
}
const closeContextMenu = ()=>{
      pageData.isShowContextMenu = false; // 关闭菜单 
      document.body.removeEventListener('click', closeContextMenu); // 移除全局点击事件监听器
    }
const TagsContextMenu = (event:any)=>{
    event.preventDefault();
    pageData.isShowContextMenu = true;
    document.body.addEventListener('click', closeContextMenu);//// 添加全局点击事件监听器
    console.log('右键触发了',event) 
}
</script>
<style scoped lang="less">
    .header {
        width: 100%;
        min-height: 90px;
        padding: 0px 20px;
        div{
            width: 100%;
        }
        .JL-Tags {
            width: auto;
        }
    }
    .custom-menu {
        position: absolute; /* 确保菜单位于所有元素之上 */
        background-color: #fff;
        border: 1px solid #ccc;
        bottom: 0;
        left: 0;
        padding: 5px;
        font-size: 12px;
        list-style: none;
        z-index: 9999; /* 调整z-index值以确保菜单显示在最前面 */
        li {
            cursor: pointer;
            margin-bottom: 4px;
            &:hover {
                color: #1677ff;
            }
        }
    }

</style>