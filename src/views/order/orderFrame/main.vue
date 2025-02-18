<template>
  <el-header style="padding: 0;overflow: hidden;height: 48px">
    <div class="mt-header">
      <el-breadcrumb style="margin-left: 50px;font-size: 20px;overflow: hidden" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </el-header>
  <el-main style="padding: 0 ;overflow: hidden;">
    <div class="order-main">
      <div style="padding: 0 50px;overflow: hidden;">
        <el-tabs style="padding: 0;overflow: hidden" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="所有订单" name="first">
            <el-card style="padding: 10px;margin: 20px ;overflow: hidden;">
              <el-row >
                <div class="demo-input-size" style="padding: 10px">
                  <!--      输入框-->
                  <span class="demonstration">商品名：</span>
                  <el-input
                      v-model="input2"
                      class="w-50 m-2"
                      placeholder="请输入用户名"
                      :suffix-icon="Search"
                      style="width: 200px"
                      clearable
                  />
                </div>

                <div class="block" style="padding: 10px">
                  <span class="demonstration">时间范围：</span>
                  <el-date-picker
                      v-model="value1"
                      type="datetimerange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="defaultTime1"
                  />
                </div>
                <div class="mb-4" style="padding: 10px">
                  <el-button @click="ClearInput" >清除</el-button>
                  <el-button type="success" @click="fetchTableData">查询</el-button>
                </div>
              </el-row>
              <el-divider border-style="double" />
              <!-- ---------------------------------------------------------表格属性------------------------------------- -->

              <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="orderId" label="订单号" width="150" />
                <el-table-column prop="proName" label="商品名" width="150" />
                <el-table-column prop="proPrice" label="单价" width="150" />
                <el-table-column prop="proNum" label="数量" width="150" />
                <el-table-column prop="proPay" label="需付款" width="150" />
                <el-table-column prop="proStatus" label="交易状态" width="200" />
                <el-table-column  fixed="right" label="操作" align="center" width="280">
                  <template #default="scope">
                    <el-button v-if="scope.row.proStatus === '待付款'" plain type="danger" size="small" disabled>
                      取消订单
                    </el-button>
                    <el-button v-if="scope.row.proStatus === '待付款'" plain type="danger" size="small" @click="handlePay(scope.row)">
                      立即付款
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- --------------------------------------------------------------------------------------------  分页-->
              <hr class="my-4" />

              <div class="demo-pagination-block">
                <el-pagination
                    v-model:current-page="currentPage4"
                    v-model:page-size="pageSize4"
                    :page-sizes="[5, 10, 15, 20]"
                    :small="small"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="second" disabled>待付款</el-tab-pane>
          <el-tab-pane label="待发货" name="third" disabled>待发货</el-tab-pane>
          <el-tab-pane label="待收货" name="fourth" disabled>待收货</el-tab-pane>
        </el-tabs>
      </div>

    </div>
  </el-main>



</template>
<script lang="ts" setup>
import {ref, onMounted, reactive} from 'vue';
import { Search } from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage} from 'element-plus';
import request from "@/util/request";
import { useRouter} from "vue-router";



const router = useRouter();

//---------------------------------------------处理输入框
const input2 = ref('')
//添加信息弹窗
// ---------------------------------------------定义对话框的显示状
const dialogVisible1 = ref(false);
// ---------------------------------------------------时间选择器
const value1 = ref('')
const value2 = ref('')
/*
* ------------------------------------------------分页
* */
const currentPage4 = ref(1)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const total = ref(0)


//-----------------------------------------------------处理表单数据
const tableData = ref([]);

// -------------------------------------------------初始化时间选择器
const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0) // '12:00:00'
const defaultTime2: [Date, Date] = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
] // '12:00:00', '08:00:00'


// ----------------------------------------------------组件挂载时获取数据
onMounted(() => {
  fetchTableData();
});

// ----------------------------------------------------------------------------------------------------处理zhifu
const handlePay = (row) => {
  request.delete('/buyer/deleteByUsername', {params:{username:row.username}}).then(res => {
    if (res.data && res.data.code === 0) {
      ElMessage.success('删除成功');
      fetchTableData();
    } else {
      ElMessage.error('删除失败');
    }
  });
}


// ----------------------------------------
// 获取表格数据的方法
const user = JSON.parse(localStorage.getItem('user') || '{}');
const fetchTableData = () => {
  request.get('/orderGetData',   {
        params:{
          pageSize:pageSize4.value,
          pageNum:currentPage4.value,
          name:input2.value,
          begin:value1.value,
          end:value2.value,
          id:user.data.id,
        }
      }
  ).then(res => {
    if (res.data && res.data.code === 0) {
      tableData.value = res.data.data.rows;

      total.value = res.data.data.total;
    }else {
      ElMessage.error('获取数据失败');
    }
  })
};

//-------------------------------------------------清空按钮
const ClearInput = ()=>{
  input2.value = '';
  value1.value = '';
  value2.value = '';
  fetchTableData();
}

// -----------------------------------------------------------
//-处理页码
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize4.value = val;
  fetchTableData();
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage4.value = val;
  fetchTableData();
}
// 引入组件
import { TabsPaneContext} from 'element-plus'
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss" scoped>
.mt-header {
  height: 25px;
  padding: 12px 0;
  position: relative;
  z-index: 5;
  background-color:#a7abb7;
  border-bottom: 1px #e7e7e7 solid;
}
.order-main{
  width: 100%;
  height: 590px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  background: #f1f2f6;

}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.table-head-mod__table___17eFg {
  margin: 10px 0;
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  text-align: center;
}

.bought-table-mod__table___3Onwb {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  color: #3c3c3c;
  table-layout: fixed;
}
</style>