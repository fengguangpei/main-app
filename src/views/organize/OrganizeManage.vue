<template>
  <div class="organization oa-width-100p oa-height-100p oa-flex-column">
    <!-- 操作 -->
    <div class="operatr-section">
      <el-button plain @click="quit"> 新增下级组织 </el-button>
      <el-dropdown class="oa-mg-left-8" trigger="click">
        <el-button plain> 批量操作 </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>批量删除</el-dropdown-item>
            <el-dropdown-item>批量开启</el-dropdown-item>
            <el-dropdown-item>批量禁用</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 表格 -->
    <div class="table-section">
      <div class="vxe-table-box">
        <vxe-table
          :data="tableData"
          height="auto"
          auto-resize
          round
          show-header-overflow
          show-overflow
          :tree-config="{
            transform: true,
            rowField: 'code',
            parentField: 'parentCode'
          }"
        >
          <vxe-table-column type="checkbox" width="46px" align="center"></vxe-table-column>
          <vxe-table-column field="name" title="组织名称" tree-node>
            <template #default="{ row }">
              <el-icon>
                <IEpHomeFilled class="oa-warning-color" />
              </el-icon>
              {{ row.name }}
            </template>
          </vxe-table-column>
          <vxe-table-column field="code" title="组织编号"></vxe-table-column>
          <vxe-table-column field="type" title="组织类型"></vxe-table-column>
          <vxe-table-column field="principal" title="负责人"></vxe-table-column>
          <vxe-table-column field="number" title="员工数"></vxe-table-column>
          <vxe-table-column field="status" title="状态">
            <template #default="{ row }">
              <span :class="[row.status ? 'oa-success-color' : 'oa-danger-color']">
                {{ row.status ? '启用' : '禁用' }}
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="operation" title="操作" width="180px">
            <template #default="{ row }">
              <el-button link type="primary" size="small"> 查看详情 </el-button>
              <el-dropdown trigger="click">
                <el-button type="text" size="small"> 更多操作 </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>添 加</el-dropdown-item>
                    <el-dropdown-item>删 除</el-dropdown-item>
                    <el-dropdown-item v-if="!row.status">开 启</el-dropdown-item>
                    <el-dropdown-item v-if="row.status">禁 用</el-dropdown-item>
                    <el-dropdown-item>操作日志</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
</script>

<style scoped lang="scss"></style>
