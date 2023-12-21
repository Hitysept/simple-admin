<template>
    <!--无子集-->
    <a-menu-item v-if="!hasChildren" :key="items.path" @click="handleMenuItem(items.path)">
        {{ items.name }}
    </a-menu-item>
    <a-sub-menu  v-else :key="items.path+'/'">
        <!-- <template #icon>
            <component class="icons" :is="itm.meta?.icon"></component>
        </template> -->
        <template #title class="title">
            {{items.name}}
        </template>
        <JLmenuItem v-for="itm in items.children" :items="itm"></JLmenuItem>
    </a-sub-menu>
</template>
<script lang="ts" setup name="JLmenuItem">
import { PropType} from 'vue';
import { menuChildrens } from "@/store/types/menuTypes";
import { useMenuStore } from "@/store/menuStore";
import router from '@/router/index';
const props = defineProps({
                items: {
                    type: Object as PropType<menuChildrens>,
                    default: ()=>{
                        return {}
                    }
                }
            });
const menuStore = useMenuStore();
const hasChildren = props.items.children.length > 0;
const handleMenuItem = (path:string)=>{   
    menuStore.setSelectedKeys(path);
    router.push(path);
}
</script>
<style scoped>

</style>