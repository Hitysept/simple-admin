import {App} from 'vue'
import JLflexVue from './JLFlex.vue';

/** 
*
*/
const components = [
  {title: 'JLFlex', componentName: JLflexVue},
]

export default {
  install(app: App) {
    components.forEach(item => {
      // 通过循环遍历数据批量注册组件
      app.component(item.title, item.componentName)
    })
  }
}