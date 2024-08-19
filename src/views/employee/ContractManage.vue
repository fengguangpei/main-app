<template>
  <div class="contract oa-flex-column oa-width-100p oa-height-100p">
    <!-- 筛选 -->
    <div id="search-section">
      <el-select
        v-model="business"
        placeholder="全部事业部"
        class="oa-width-140"
        clearable
        collapse-tags
        multiple
      >
        <el-option
          v-for="item of businesses"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="apartment"
        placeholder="部门"
        class="oa-width-140"
        clearable
        collapse-tags
        multiple
      >
        <el-option
          v-for="item of apartments"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="rank"
        placeholder="全部职级"
        class="oa-width-140"
        clearable
        collapse-tags
        multiple
      >
        <el-option
          v-for="item of ranks"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <div class="date-box">
        <el-select v-model="dateType" class="oa-width-100">
          <el-option
            v-for="item of dateTypes"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="oa-width-240"
          :editable="false"
          :shortcuts="dateShortcuts"
        />
      </div>
      <div class="senior-box">
        <el-select v-model="searchType" class="oa-width-100">
          <el-option
            v-for="item of searchTypes"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input v-model="searchValue" class="oa-width-240 input">
          <template #suffix>
            <el-icon class="oa-fz-18 oa-pointer">
              <IEpSearch />
            </el-icon>
          </template>
        </el-input>
      </div>
      <el-button plain @click="reset"> 重置 </el-button>
    </div>
    <!-- 操作 -->
    <div class="operatr-section">
      <el-button plain>签订合同</el-button>
      <el-button plain>续签合同</el-button>
      <el-button plain>解除合同</el-button>
      <refresh-page></refresh-page>
    </div>
    <!-- 表格 -->
    <div class="table-section">
      <div class="vxe-table-box">
        <vxe-table
          :data="tableData"
          empty-text="暂无数据"
          height="auto"
          auto-resize
          round
          show-header-overflow
        >
          <vxe-table-column type="checkbox" width="46px" align="center"></vxe-table-column>
          <vxe-table-column field="avatar" title="头像"></vxe-table-column>
          <vxe-table-column field="username" title="姓名"></vxe-table-column>
          <vxe-table-column field="job_umber" title="工号"></vxe-table-column>
          <vxe-table-column field="apartment" title="部门"></vxe-table-column>
          <vxe-table-column field="rank" title="职位"></vxe-table-column>
          <vxe-table-column field="contract_status" title="合同状态"></vxe-table-column>
          <vxe-table-column field="contract_type" title="合同类型"></vxe-table-column>
          <vxe-table-column field="contract_code" title="合同编号"></vxe-table-column>
          <vxe-table-column field="contract_count" title="签订次数"></vxe-table-column>
          <vxe-table-column field="contract_time" title="签订时间"></vxe-table-column>
          <vxe-table-column field="operator" title="操作"></vxe-table-column>
        </vxe-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          v-model:page-size="pagination.size"
          v-model:current-page="pagination.currentPage"
          background
          :page-sizes="[20, 50, 100, 200]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="getTableData"
          @current-change="getTableData"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { businesses, apartments, ranks } from '../../assets/js/select.js'
import { ref, reactive } from 'vue'
// 筛选
const business = ref([])
const apartment = ref([])
const rank = ref([])
const dateType = ref('contract_time')
const dateValue = ref([])
const searchType = ref('工号')
const searchValue = ref('')
const dateTypes = [
  {
    id: 'contract_time',
    name: '签订时间'
  }
]
const searchTypes = reactive([
  {
    id: '工号',
    name: '工号'
  }
])
const reset = () => null
// 表格
const tableData = ref([
  {
    avater: 'avater',
    username: 'username'
  }
])
const getTableData = async () => {}
// 分页
const pagination = reactive({
  size: 20,
  currentPage: 1
})
</script>

<style scoped lang="scss"></style>
