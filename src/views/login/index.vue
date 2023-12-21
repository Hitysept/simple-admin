<template>
  <div class="JL-flex JL-col JL-justify-center JL-align-center JL-hight100">
    <div class="bg-box">
      <div class="bg-title">
        桑
        <div class="bg-title-sub">落</div>
      </div>

    </div>
    <div class="JL-flex JL-col JL-login-box">
      <div class="JL-text-center JL-MTB20 JL-title">欢迎来到桑落后台</div>
      <div class="JL-flex-1">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 16 }"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="账号"
            name="username"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>
      
          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          >
            <a-input-password v-model:value="formState.password" autocomplete="on"/>
          </a-form-item>
      
          <a-form-item name="remember" :wrapper-col="{ span: 14, offset: 4 }">
            <JLFlex justify="flex-end" :style="{'width': '100%'}" >
              <JLFlex>
                <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
              </JLFlex>
              <JLFlex flex="1">
                <!-- <a-button type="primary" html-type="submit">登录</a-button> -->
                <a-button type="primary" html-type="submit" style="width: 100%;" :loading="loginLoading">登录</a-button>
              </JLFlex>
            </JLFlex>
          </a-form-item>
        </a-form>
      </div>
    </div>  
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive,ref } from 'vue';
  import { login } from '@/apis/login';
  import router from '@/router/index';
  // import { GeneratorRouterOfLogin } from '@/router/routerGenerator';
  import { notification } from "ant-design-vue"
  
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  onMounted(()=>{
    const token = window.sessionStorage.getItem("token");
    if(token && token!==""){
      router.replace('/');
    }
  })
  const loginLoading = ref<boolean>(false);
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish =async (values: FormState) => {
    loginLoading.value = true;
    let res:any = await login(values).then();
    if(res.userInfo){
      if(res.menuInfo?.length>0){
        // GeneratorRouterOfLogin(res.menuInfo);
        router.replace('/');
        window.sessionStorage.setItem('token',res.userInfo.token);
      }else{
        loginLoading.value = false;
        notification.error({message: `网站提示`,
                            description:'您的账号无任何权限',
                            placement:'top',
                          })
      }
    }else{
      loginLoading.value = false;
      notification.error({message: `网站提示`,
                            description: res.msg!,
                            placement:'top',
                          })
    }
  };  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>