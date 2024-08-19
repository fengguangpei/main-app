<template>
  <div class="roster oa-width-100p oa-height-100p oa-flex-column">
    <!-- 搜索 -->
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
          :label="item.name"
          :value="item.id"
          :key="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="apartment"
        placeholder="全部部门"
        class="oa-width-140"
        clearable
        collapse-tags
        multiple
      >
        <el-option
          v-for="item of apartments"
          :label="item.name"
          :value="item.id"
          :key="item.value"
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
          :label="item.name"
          :value="item.id"
          :key="item.value"
        ></el-option>
      </el-select>
      <div class="date-box">
        <el-select v-model="dateType" class="oa-width-100">
          <el-option
            v-for="item of dateTypes"
            :label="item.name"
            :value="item.id"
            :key="item.value"
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
            :label="item.name"
            :value="item.id"
            :key="item.value"
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
      <el-button plain> 新增员工 </el-button>
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
          :border="true"
          round
        >
          <vxe-table-column type="checkbox" width="46px" align="center"></vxe-table-column>
          <vxe-table-column field="avatar" title="头像"></vxe-table-column>
          <vxe-table-column field="username" title="姓名"></vxe-table-column>
          <vxe-table-column field="job_umber" title="工号"></vxe-table-column>
          <vxe-table-column field="apartment" title="部门"></vxe-table-column>
          <vxe-table-column field="phone" title="手机号码"></vxe-table-column>
          <vxe-table-column field="position" title="职位"></vxe-table-column>
          <vxe-table-column field="type" title="类型"></vxe-table-column>
          <vxe-table-column field="certificate" title="证件类型"></vxe-table-column>
          <vxe-table-column field="certificate_code" title="证件号码"></vxe-table-column>
          <vxe-table-column field="join_date" title="入职日期"></vxe-table-column>
        </vxe-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          background
          v-model:page-size="pagination.size"
          v-model:current-page="pagination.currentPage"
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
import { businesses, ranks, apartments } from '../../assets/js/select.js'
import { ref, reactive } from 'vue'
// 筛选
const apartment = ref([])
const rank = ref([])
const business = ref([])
const dateType = ref('joinDate')
const dateValue = ref([])
const searchType = ref('工号')
const searchValue = ref('')
const dateTypes = reactive([
  {
    id: 'joinDate',
    name: '入职时间'
  }
])
const searchTypes = reactive([
  {
    id: '工号',
    name: '工号'
  }
])
const reset = () => {
  apartment.value = []
  rank.value = []
  business.value = []
  dateValue.value = []
  searchValue.value = ''
}
// 表格
const tableData = ref([])
const getTableData = async () => {
  console.log(pagination)
}
// 分页
const pagination = reactive({
  size: 20,
  currentPage: 1
})
</script>

<style scoped lang="scss"></style>
