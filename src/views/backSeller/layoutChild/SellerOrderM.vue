<template>
  <el-card style="padding: 10px;margin: 20px">
    <el-row >
      <div class="demo-input-size" style="padding: 10px">
        <!--      输入框-->
        <span class="demonstration">订单号：</span>
        <el-input
            v-model="input2"
            class="w-50 m-2"
            placeholder="请输入订单号"
            :suffix-icon="Search"
            style="width: 200px"
            clearable
        />
      </div>

      <div class="block" style="padding: 10px">
        <span class="demonstration">订单生成时间：</span>
        <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime1"
            style="width: 350px"
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
      <el-table-column align="center" fixed prop="sellerOrderId" label="订单号" width="80" />
      <!--    <el-image :src="" style="width: 100px; height: 100px"></el-image>-->
      <el-table-column align="center" fixed prop="sellerOrderName" label="商品名" width="90" />
      <el-table-column align="center"  prop="sellerOrderPrice" label="商品价格" width="100" />
      <el-table-column align="center"  prop="sellerOrderDate" label="订单生成时间" width="180" />
      <el-table-column align="center" prop="sellerOrderDetail" label="商品详情" width="250" />
      <el-table-column align="center"  prop="sellerOrderNum" label="订单数量" width="100" />
      <el-table-column align="center" prop="sellerBuyerName" label="买家姓名" width="90" />
      <el-table-column align="center" prop="sellerAddress" label="配送地址" width="150" />
      <el-table-column align="center" fixed="right" label="操作"  width="120">
        <template #default="scope">
          <el-button v-if="!scope.row.viewFahuo" plain type="success" size="small" @click="handleFahuo(scope.row)">
            发货
          </el-button>
          <el-button v-if="scope.row.viewFahuo" plain type="info" size="small"  disabled>
            已发货
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
          :disabled="disabledPage"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------- -->


<script lang="ts" setup>

import {ref, onMounted, reactive} from 'vue';
import {Delete, Download, Plus, Search, Upload, ZoomIn} from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage} from 'element-plus';
import request from  '@/util/request';
import { useRouter} from "vue-router";
import type { FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'


const user = JSON.parse(localStorage.getItem('user') || '{}');
const router = useRouter();


//---------------------------------------------处理输入框
const input2 = ref('')
//添加信息弹窗

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
const disabledPage = ref(false)
const total = ref(0)



//-----------------------------------------------------处理表单数据
const tableData = ref([
  {
    sellerOrderId: '',
    sellerOrderName: '',
    sellerOrderPrice: '',
    sellerOrderDate: '',
    sellerOrderDetail: '',
    sellerOrderNum: '',
    sellerBuyerName: '',
    sellerAddress: '',
    viewFahuo: false,
  }
]);

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


const handleFahuo = (row: any) =>{
  row.viewFahuo = true;
}


// ----------------------------------------
// 获取表格数据的方法
const fetchTableData = () => {
  request.get('/sellerOrderView',   {
        params:{
          pageSize:pageSize4.value,
          pageNum:currentPage4.value,
          name:input2.value,
          begin:value1.value,
          end:value2.value,
          id:user.data.id
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
</script>
<style>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;

}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.el-radio-group {
  margin-right: 12px;
}

</style>

