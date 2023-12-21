<template>
    <JLFlex :style="{height:'100vh'}">
      <JLFlex flex="1">
        <JLslider></JLslider>
      </JLFlex>
      <JLFlex flex="6" vertical>
        <JLFlex>
          <JLheader></JLheader>
        </JLFlex>
        <JLFlex flex="1" vertical>
          <div class="JL-PLR20">
            <JLBody></JLBody>
          </div>
        </JLFlex>
        <JLFlex vertical>
          <JLfooter></JLfooter>
        </JLFlex>
      </JLFlex>
    </JLFlex>
</template>
<script lang="ts" setup>
import JLfooter from '@/layout/JLfooter.vue';
import JLslider from "@/layout/JLsliderBar.vue";
import JLheader from "@/layout/JLheader.vue";
import JLBody from "@/layout/JLBody.vue";

</script>
<style scoped>

</style>
  