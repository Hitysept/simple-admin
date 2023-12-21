<template>
    <JLFlex flex="1" class="JLFrom" justify="center">
        <a-form
            :model="pageData.formState"
            name="basic"
            layout="horizontal"
            style="width: 65%;"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            >
            <a-form-item 
                label="菜单名字"
                name="name"
                :rules="[{ required: true, message: '请填写菜单名字' }]"
                >
                <a-input v-model:value="pageData.formState.name"/>
            </a-form-item>
            <a-form-item 
                label="父级菜单"
                name="parentId"
                :rules="[{ required: true, message: '请选择父级菜单' }]"
                >
                <a-tree-select v-model:value="pageData.formState.parentId" :tree-data="pageData.treeData" />
            </a-form-item >
            <a-form-item 
                label="前端访问路径"
                name="path"
                :rules="[{ required: true, message: '请填写前端访问路径' }]"
                >
                <!-- <a-input-group compact> -->
                    <!-- <span style="width: 20%"> {{  }}</span> -->
                    <a-input v-model:value="pageData.formState.path"/>
                <!-- </a-input-group> -->
            </a-form-item>
            <a-form-item 
                label="前端组件路径"
                name="component"
                >
                <a-input v-model:value="pageData.formState.component"/>
            </a-form-item>
            <a-form-item 
                label="后端访问路径"
                name="requestUrl"
                >
                <a-input v-model:value="pageData.formState.requestUrl"/>
            </a-form-item>
            <a-form-item 
                label="菜单等级"
                name="menuLevel"
                >
                <a-input v-model:value="pageData.formState.menuLevel"/>
            </a-form-item>
            <a-form-item
                label="菜单类型"
                name="menuType"
                >
                <a-radio-group v-model:value="pageData.formState.menuType" name="radioGroup">
                    <a-radio value="1">菜单</a-radio>
                    <a-radio value="2">按钮</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                label="是否禁用"
                name="deleteStatus"
                >
                <a-switch v-model:checked="pageData.formState.deleteStatus" />
            </a-form-item>
            <a-form-item>
                <div class="JL-block JLFrom-btn JL-flex JL-flexend">
                    <a-button type="primary" html-type="submit" :loading="pageData.isSaveLoading">保存</a-button>
                </div>
            </a-form-item>
        </a-form>
    </JLFlex> 
</template>
<script lang="ts" setup>
    import { reactive, onMounted } from 'vue';
    import { menuChildrens } from '@/store/types/menuTypes';
    import { getDynamicMenus, saveMenu } from '@/apis/rolemenuApi';
    import { menuToAntdTree } from '@/utils/common';

    import { TreeSelectProps,notification } from 'ant-design-vue';
import router from '@/router/index';

    interface pageState {
        treeData:TreeSelectProps['treeData'],
        formState: FormState,
        menuId:string,
        isSaveLoading:boolean,
    }
    interface FormState {
        menuCode:string,
        requestUrl:string,
        path: string,
        component:string,
        menuType: string,
        menuLevel: string,
        menuLevelCode:string,
        parentId: string,
        name:string,
        deleteStatus:boolean|number,
        menuId:string
    }

    const  pageData = reactive<pageState>({
                                            treeData:[],
                                            formState:{
                                                menuId:'',
                                                menuCode:"1",
                                                requestUrl:"",
                                                path: "",
                                                component:"",
                                                menuType: "1",
                                                menuLevel: "3",
                                                menuLevelCode:"3",
                                                parentId: "",
                                                name:"",
                                                deleteStatus:false
                                            },
                                            menuId:'',
                                            isSaveLoading:false,
                                        });
    const _init = async ()=>{
            const menuListRes:menuChildrens[] = await getDynamicMenus().then();
            if(history.state.editMenuInfo){
                const tempData = JSON.parse(history.state.editMenuInfo);
                pageData.formState = {...tempData};
                pageData.formState.deleteStatus = tempData.deleteStatus==0?true:false;
                pageData.menuId = tempData.menuId;
            }
            pageData.treeData = menuToAntdTree(menuListRes);
            pageData.treeData.push({
                                    label:'顶级菜单',
                                    value:'1'
                                    })
        }
    onMounted(()=>{
        _init();
    })
    const onFinish = async (values: FormState) => {
        pageData.isSaveLoading = true;
        values.deleteStatus = values.deleteStatus?0:1;
        let res;
        if(pageData.menuId!=''){
            values.menuId = pageData.menuId;
        }
        res = await saveMenu(values).then();
        if(res){
           notification.success({message: `网站提示`,
                                description:'保存成功',
                                placement:'top',
                                });
            router.go(-1);
        }else{
            pageData.isSaveLoading = false;
            notification.error({message: `网站提示`,
                                description:'保存失败',
                                placement:'top',
                                });
        }
    };  
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
</script>
<style lang="less">
    .JLFrom {
        padding-top: 40px;
        .JLFrom-btn {
            margin-left: 150px;
        }
    }
</style>
  
  