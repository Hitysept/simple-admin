import { createApp } from 'vue'
import main from './main.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@/assets/style/375base.less'
import router from "@/router/index";
import store  from '@/store';
import components from '@/components/components'


createApp(main).use(router).use(Antd).use(components).use(store).mount('#main')
