<template>
    <JLFlex flex="1" class="JLFrom" justify="center">
        <a-form
            :model="formState"
            name="basic"
            layout="horizontal"
            style="width: 65%;"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            >
            <a-form-item 
                label="角色名字"
                name="name"
                :rules="[{ required: true, message: '请填写角色名字' }]"
                >
                <a-input v-model:value="formState.name"/>
            </a-form-item>
            <a-form-item>
                <div class="JL-block JLFrom-btn JL-flex JL-flexend">
                    <a-button type="submit">保存</a-button>
                </div>
            </a-form-item>
        </a-form>
    </JLFlex> 
</template>
<script lang="ts" setup>
    import { reactive, onMounted } from 'vue';
    import { saveMenu } from '@/apis/rolemenuApi';
    import { notification } from 'ant-design-vue';
    import router from '@/router/index';
    interface FormState {
        name:string
    }

    const formState = reactive<FormState>({
        name:""
    });
    const _init = async ()=>{
            
        }
    onMounted(()=>{
        _init();
    })
    const onFinish = async (values: FormState) => {
        let res = await saveMenu(values).then();
        if(res){
           notification.success({message: `网站提示`,
                                description:'保存成功',
                                placement:'top',
                                });
            router.go(-1);
        }else{
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
    
</style>
  
  