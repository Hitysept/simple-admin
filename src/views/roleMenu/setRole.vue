<template>
    <JLFlex flex="1" class="JLFrom" vertical>
        <JLFlex flex="1" vertical>
            <a-checkbox @click="checkAllRole()" :checked="checkAllList">全选</a-checkbox>
            <div v-for="itm in pageData.treeData" class="JLCheckBoxTree">
                <div v-for="m in itm" class="JLCheckBox">
                    <a-checkbox @click="checkRole(m.value)" :value="m.value" :checked="checkList.includes(m.value)">{{ m.label }}</a-checkbox>
                </div>
            </div>
        </JLFlex>
        
        <div class="JL-block JL-flex JL-flexend JL-PLR20 JL-PTB20">
            <button class="JL-btn JL-btn-primary" v-if="pageData.btnAuth.get('saveRole')" @click="saveRole">保存</button>
        </div>
    </JLFlex> 
</template>
<script lang="ts" setup>
    import { reactive, onMounted ,ref, computed } from 'vue';
    import { menuChildrens,checkListItem } from '@/store/types/menuTypes';
    import { getRoleMenusMap,saveRoleMenu } from '@/apis/rolemenuApi';
    import { menuToArray } from '@/utils/common';
    import router from '@/router/index';
    interface pageState {
        treeData:Array<checkListItem[]>
        menusList:Array<string>,
        btnAuth:Map<string,boolean>
    }
    interface FormState {
        "role_id": string,
        "menu_id": string,
        "status"?:  number
    }
    
    let formState:Array<FormState> = [];
    let checkList = ref<Array<string>>([]);
    const  pageData = reactive<pageState>({treeData:[],menusList:[],btnAuth:new Map()}); 
    const currentRoleId = history.state.roleId;
    const _init = async ()=>{
        pageData.btnAuth.set("saveRole",router.hasRoute("/system/roleIndex/saveRole"));
        const menuListRes:menuChildrens[] = await getRoleMenusMap({roleId:currentRoleId}).then();
        pageData.treeData = menuToArray(menuListRes);
        pageData.treeData.forEach((m:Array<checkListItem>)=>{
            m.forEach((n:checkListItem)=>{
            pageData.menusList.push(n.value);
                if(n.status == 1){
                checkList.value.push(n.value);
                }  
            })
        })
    }
    onMounted(()=>{
        _init();
    })

    let checkAllList = computed(() => {
        return !(pageData.menusList.length>checkList.value.length);
    });

    const checkRole = (value:string) => {
        if(checkList.value.includes(value)){
            checkList.value = checkList.value.filter(item=>{
                return item !== value
            })
        }else{
            checkList.value.push(value); 
        }
    }
    const checkAllRole = ()=>{
        if(checkList.value.length<pageData.menusList.length){
            pageData.menusList.forEach((m:string)=>{
                if(!checkList.value.includes(m)){
                    checkList.value.push(m);
                }
            })
        }else{
            checkList.value = [];
        }
    }
    const saveRole =async () =>{
        formState = [];
        pageData.menusList.forEach((m)=>{
            const roleMenuStatus = checkList.value.includes(m)?1:0;
            const tempStrings = {"role_id":currentRoleId,"menu_id":m ,status:roleMenuStatus}
            formState.push(tempStrings);
        })
        const res = await saveRoleMenu(formState);
        if(res){
            router.go(-1);
        }
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
  
  