<template>
    <JLFlex flex="1" vertical>
        <div class="JL-block JL-flex JL-MTB10">
            <a-button v-if="pageData.btnAuth.get('saveMenu')" type="primary" @click="toSaveMenu">新增菜单</a-button>
        </div>
        <a-table :columns="pageData.columns" :data-source="pageData.data" hi>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'menuType'">
                    <a-tag color="success" v-if="record.menuType==2">按钮</a-tag>
                    <a-tag color="processing" v-else-if="record.menuType==1">菜单</a-tag>
                    <a-tag color="error" v-else>未定义类型</a-tag>
                </template>
                <template v-if="column.key === 'action'">
                    <span>
                        <a v-if="pageData.btnAuth.get('del')"><DeleteOutlined two-tone-color="#eb2f96"/></a>
                        <a-divider v-if="pageData.btnAuth.get('del')&&pageData.btnAuth.get('modify')" type="vertical" />
                        <a><EditOutlined v-if="pageData.btnAuth.get('modify')" @click="toEditMenu(record)" two-tone-color="#eb2f96"/></a>
                    </span>
                </template>
            </template>
        </a-table>
    </JLFlex>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { getMenusList } from '@/apis/rolemenuApi';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons-vue';
import router from '@/router/index';
import { menuChildrens } from '../../store/types/menuTypes';
    interface pageState {
        data:Array<roleTabelItem>
        columns?:Array<columnItem>
        pageInfo:PageInfo,
        btnAuth:Map<string,boolean>
    }
    interface PageInfo {
        currPage:number|string,
        pageSize:number|string
    }
    interface roleTabelItem {
        roleName:string,
        creator:string,
        updateUser:string,
        createTime:string,
        updateTime:string
    }
    interface columnItem {
        title:string,
        key:string,
        dataIndex:string,
        colSpan?:number
    }
    const  pageData = reactive<pageState>({
                                            data:[],
                                            pageInfo:{
                                                currPage:1,
                                                pageSize:10
                                            },
                                            btnAuth:new Map()
                                        });
    const _init = async ()=>{
            const roleList:Array<roleTabelItem> = await getMenusList(pageData.pageInfo).then();
            pageData.btnAuth.set("del",router.hasRoute("/system/roleIndex/setRole"));
            pageData.btnAuth.set("modify",router.hasRoute("/system/roleIndex/editMenu"));
            pageData.btnAuth.set("saveMenu",router.hasRoute("/system/menu/saveMenu"));
            pageData.columns = [{ title: '菜单Id',dataIndex: 'menuId',key: 'menuId'},
                                { title: '菜单名称',dataIndex: 'name',key: 'name'},
                                { title: '前端访问路径',dataIndex: 'path',key: 'path'},
                                { title: '前端组件路径',dataIndex: 'component',key: 'component'},
                                { title: '后端访问路径',dataIndex: 'requestUrl',key: 'requestUrl'},
                                { title: '菜单类型',dataIndex: 'menuType',key: 'menuType' },
                                { title: '操作',dataIndex: 'action',key: 'action'},]
            pageData.data = roleList;
    }
    onMounted(()=>{
        _init();
    });
    const toSaveMenu = ()=>{
        // console.log(path,roleId);
        router.push({path:'/system/menu/saveMenu'});
    }
    const toEditMenu = (record:menuChildrens)=>{
        router.push({path:'/system/menu/editMenu',state:{editMenuInfo:JSON.stringify(record)}});
    }
</script>
<style lang="less">
.JLCheckBoxTree {
    width: 100%;
    display: block;
    padding-left: 25px;
    .JLCheckBox{
        display: inline-block;
    }
    .JLCheckBox:first-child {
        display: block;
    }
    .JLCheckBox:nth-child(2) {
        margin-left: 20px;
    }
}
</style>
  
  