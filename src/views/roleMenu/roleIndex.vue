<template>
    <JLFlex flex="1" vertical>
        <div class="JL-block JL-flex JL-MTB10">
            <a-button type="primary" @click="toSaveRole">新增角色</a-button>
        </div>
        <a-table :columns="pageData.columns" :data-source="pageData.data" hi>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <span>
                        <a @click="toSetRole('/system/roleIndex/setRole',record.roleId)"><SettingFilled two-tone-color="#eb2f96"/></a>
                        <a-divider type="vertical" />
                        <a><DeleteOutlined two-tone-color="#eb2f96"/></a>
                        <a-divider type="vertical" />
                        <a><EditOutlined two-tone-color="#eb2f96"/></a>
                    </span>
                </template>
            </template>
        </a-table>
    </JLFlex>
</template>
<script lang="ts" setup>
    import { reactive, onMounted } from 'vue';
    import { getRoleList } from '@/apis/rolemenuApi';
    import { EditOutlined,DeleteOutlined,SettingFilled } from '@ant-design/icons-vue';
    import router from '@/router/index';
    interface pageState {
        data:Array<roleTabelItem>
        columns?:Array<columnItem>
        pageInfo:PageInfo
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
                                            }
                                        });
    const _init = async ()=>{
            const roleList:Array<roleTabelItem> = await getRoleList(pageData.pageInfo).then();
            pageData.columns = [{ title: '用户组',dataIndex: 'roleName',key: 'roleName'},
                                { title: '创建者',dataIndex: 'creator',key: 'creator'},
                                { title: '创建日期',dataIndex: 'createTime',key: 'createTime'},
                                { title: '更新者',dataIndex: 'updateUser',key: 'updateUser'},
                                { title: '更新日期',dataIndex: 'updateTime',key: 'updateTime' },
                                { title: '操作',dataIndex: 'action',key: 'action'},]
            pageData.data = roleList;
    }
    onMounted(()=>{
        _init();
    })
    const toSaveRole = ()=>{
        // console.log(path,roleId);
        router.push({path:'/system/roleIndex/addRole'});
    }
    const toSetRole = (path:string, roleId:string)=>{
        // console.log(path,roleId);
        router.push({path,state:{roleId}});
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
  
  