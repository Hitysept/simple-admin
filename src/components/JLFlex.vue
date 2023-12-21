<template>
   <div class="JL-flex" :class="calssName" :style="styles">
    <slot></slot>
   </div>
</template>
<script lang="ts" setup name="JLFlex">
import { ref } from 'vue';
  const props = defineProps({
      flex: [String,Number],
      align: String,
      justify: String,
      wrap: String,
      vertical: Boolean,
      style:Object
   });
   const styles = ref({});
   const calssName = ref<Array<string>>([]);
   let colOrRow = 'JL-row';
   if(props.flex) styles.value = {...styles.value,flex:props.flex};
   if(props.align) styles.value = {...styles.value,"align-items":props.align};
   if(props.justify) styles.value = {...styles.value,"justify-content":props.justify};
   if(props.wrap) styles.value = {...styles.value,"flex-wrap":props.wrap};
   if(props.style) styles.value = {...styles.value,...props.style};
   if(props.vertical) colOrRow = "JL-col";
   calssName.value.push(colOrRow);
</script>
<style scoped lang="less">
   .JL-flex {
      display: flex;
      &.JL-col{
         flex-direction: column;
      }
      &.JL-row{
         flex-direction: row;
      }
   }
</style>