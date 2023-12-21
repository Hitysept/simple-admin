<template>
  <router-view v-slot="{ Component, route }">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="route.meta.title"
      sub-title="This is a subtitle"
      @back="rollBack"
    />
    <component
      :is="Component"
      :key="route.path"
    >
    </component>
  </router-view>
</template>
<script lang="ts" setup>
  import router from '@/router/index';
  const rollBack = ()=>{
    router.go(-1);
  }
</script>
