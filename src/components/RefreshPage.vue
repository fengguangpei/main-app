<template>
  <el-button text size="small" @click="refresh">
    <el-icon>
      <IEpRefresh></IEpRefresh>
    </el-icon>
  </el-button>
</template>

<script setup>
import useReshPage from '../hooks/useRefresh'
const refresh = useReshPage()
</script>

<style scoped lang="scss">
.el-button {
  margin-left: auto !important;
  font-size: 16px;
  :hover {
    background-color: rgb(11 16 25 / 6%) !important;
  }
}
</style>
