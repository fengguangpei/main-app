<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
  <div id="v-tip">
    <el-icon>
      <IEpCaretTop></IEpCaretTop>
    </el-icon>
  </div>
  <div id="v-text"></div>
</template>

<script setup>
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
</script>
