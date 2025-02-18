<template>
  <el-card style="padding: 10px;margin: 20px ">
    <el-row >
      <div class="demo-input-size" style="padding: 10px">
        <!--      输入框-->
        <span class="demonstration">用户名：</span>
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
        <el-button type="primary" @click="dialogVisible = true">添加信息</el-button>
      </div>
    </el-row>
    <el-divider border-style="double" />
    <!-- ---------------------------------------------------------表格属性------------------------------------- -->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="data" label="注册日期" width="150" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="address" label="地址" width="600" />
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button plain type="info" size="small" @click="handleBianji(scope.row)">
            编辑
          </el-button>
          <el-button plain type="danger" size="small" @click="handleDelete(scope.row)">
            删除
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



  <!-- -------------------------------------------------------创建弹窗表单-------------------------------------------------------- -->
  <el-dialog
      title="添加信息"
      v-model="dialogVisible"
      width="800px"
  >
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
    >
      <el-row>
        <el-form-item label="用户名：" prop="username">
          <el-input style="width: 240px" v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input style="width: 240px" v-model="ruleForm.name" placeholder="请输入姓名"/>
        </el-form-item>
      </el-row>
      <el-form-item label="手机号：" prop="phone">
        <el-input style="width: 600px" v-model="ruleForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <!--      <el-form-item label="性别：" prop="region">-->
      <!--        <el-select style="width: 600px" v-model="ruleForm.region" placeholder="请选择性别">-->
      <!--          <el-option label="男" value="男" />-->
      <!--          <el-option label="女" value="女" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="性别：">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio border  label="男" />
          <el-radio border  label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            style="width: 600px"
        />
      </el-form-item>


      <!--      <el-form-item label="Activity count" prop="count">-->
      <!--        <el-select-v2-->
      <!--            v-model="ruleForm.count"-->
      <!--            placeholder="Activity count"-->
      <!--            :options="options"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="Activity time" required>-->
      <!--        <el-col :span="11">-->
      <!--          <el-form-item prop="date1">-->
      <!--            <el-date-picker-->
      <!--                v-model="ruleForm.date1"-->
      <!--                type="date"-->
      <!--                label="Pick a date"-->
      <!--                placeholder="Pick a date"-->
      <!--                style="width: 100%"-->
      <!--            />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--        <el-col class="text-center" :span="2">-->
      <!--          <span class="text-gray-500">-</span>-->
      <!--        </el-col>-->
      <!--        <el-col :span="11">-->
      <!--          <el-form-item prop="date2">-->
      <!--            <el-time-picker-->
      <!--                v-model="ruleForm.date2"-->
      <!--                label="Pick a time"-->
      <!--                placeholder="Pick a time"-->
      <!--                style="width: 100%"-->
      <!--            />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="Instant delivery" prop="delivery">-->
      <!--        <el-switch v-model="ruleForm.delivery" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="Activity type" prop="type">-->
      <!--        <el-checkbox-group v-model="ruleForm.type">-->
      <!--          <el-checkbox label="Online activities" name="type" />-->
      <!--          <el-checkbox label="Promotion activities" name="type" />-->
      <!--          <el-checkbox label="Offline activities" name="type" />-->
      <!--          <el-checkbox label="Simple brand exposure" name="type" />-->
      <!--        </el-checkbox-group>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="Resources" prop="resource">-->
      <!--        <el-radio-group v-model="ruleForm.resource">-->
      <!--          <el-radio label="Sponsorship" />-->
      <!--          <el-radio label="Venue" />-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <el-form-item label="地址：" prop="address">
        <el-input style="width: 600px" v-model="ruleForm.address" type="textarea" />
      </el-form-item>
      <el-form-item style="margin-left: 470px" >
        <el-button  @click="dialogVisible = false">取消</el-button>
        <el-button  type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>

      </el-form-item>
    </el-form>
  </el-dialog>
  <!--  ------------------------------------------------------------------------------编辑按钮提示弹框-->
  <el-dialog
      title="添加信息"
      v-model="dialogVisible1"
      width="800px"
  >
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
    >
      <el-row>
        <el-form-item label="用户名：" prop="username">
          <el-input style="width: 240px" v-model="ruleForm1.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input style="width: 240px" v-model="ruleForm1.name" placeholder="请输入姓名"/>
        </el-form-item>
      </el-row>
      <el-form-item label="手机号：" prop="phone">
        <el-input style="width: 600px" v-model="ruleForm1.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="ruleForm1.gender">
          <el-radio border  label="男" />
          <el-radio border  label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
            v-model="ruleForm1.password"
            type="text"
            placeholder="请输入密码"
            show-password
            style="width: 600px"
        />
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input style="width: 600px" v-model="ruleForm1.address" type="textarea" />
      </el-form-item>
      <el-form-item style="margin-left: 470px" >
        <el-button  @click="dialogVisible1 = false">取消</el-button>
        <el-button  type="primary" @click="submitForm1(ruleFormRef)">
          提交
        </el-button>

      </el-form-item>
    </el-form>
  </el-dialog>




</template>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------- -->


<script lang="ts" setup>

import {ref, onMounted, reactive} from 'vue';
import { Search } from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage} from 'element-plus';
import request from '@/util/request';
import { useRouter} from "vue-router";
import type { FormInstance, FormRules } from 'element-plus'



const router = useRouter();
// ------------------------------------------------------

//---------------------------------------------处理输入框
const input2 = ref('')
//添加信息弹窗
// ---------------------------------------------定义对话框的显示状态
const dialogVisible = ref(false);
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
//-----------------------------------------------添加弹窗数据定义
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  name: '',
  phone: '',
  gender: '',
  password: '',
  address: '',
})
//-----------------------------------------------编辑弹窗数据定义
const ruleForm1 = reactive<RuleForm1>({
  username: '',
  name: '',
  phone: '',
  gender: '',
  password: '',
  address: '',
})
//------------------------------------------------------------------------定义的添加表单的数据
interface RuleForm {
  username: string
  name: string
  phone: string
  gender: string
  password: string
  address: string
}
//------------------------------------------------------------------------定义的编辑表单的数据
interface RuleForm1 {
  username: string
  name: string
  phone: string
  gender: string
  password: string
  address: string
}

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

// ---------------------------------------------------------------------定义的表单验证规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 0, max: 20, message: '长度在0至20', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2至10', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    { min: 0, max: 11, message: '长度在0至11', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 0, max: 20, message: '长度在0至20', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    { min: 0, max: 100, message: '长度在0至100', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change'},
  ],
})
//----------------------------------------------------------------------------------------------------处理编辑按钮事件
const handleBianji = (row) => {
  dialogVisible1.value  = true;
  request.get('/seller/getUserByUsername', {params:{username:row.username}}).then(res => {
    if (res.data && res.data.code === 0) {
      ruleForm1.username = res.data.data.sellerUsername;
      ruleForm1.name = res.data.data.sellerName;
      ruleForm1.phone = res.data.data.sellerPhone;
      ruleForm1.gender = res.data.data.sellerGender;
      ruleForm1.password = res.data.data.sellerPassword;
      ruleForm1.address = res.data.data.sellerAddress;
    } else {
      ElMessage.error('获取用户信息失败');
    }
  });
}
// ----------------------------------------------------------------------------------------------------处理删除按钮事件
const handleDelete = (row) => {
  request.delete('/seller/deleteByUsername', {params:{username:row.username}}).then(res => {
    if (res.data && res.data.code === 0) {
      ElMessage.success('删除成功');
      fetchTableData();
    } else {
      ElMessage.error('删除失败');
    }
  });
}

//------------------------------------------------------------------------------------增加表单中的提交按钮
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    // 验证表单
    await formEl.validate();

    // 准备要发送的数据
    const formData = {
      username: ruleForm.username,
      name: ruleForm.name,
      phone: ruleForm.phone,
      gender: ruleForm.gender,
      password: ruleForm.password,
      address: ruleForm.address,
      // 根据后端需求，可以添加更多字段
    };

    // 发送 POST 请求到后端 API
    const response = await request.post('/seller/addUser', formData);

    if (response.data && response.data.code === 0) {
      // 提交成功，显示成功消息
      ElMessage.success('提交成功');

      // 关闭弹窗
      dialogVisible.value = false;

      // 重置表单
      formEl.resetFields();

      // 刷新表格数据
      fetchTableData();
    } else {
      // 提交失败，显示错误消息
      ElMessage.error(response.data.message || '提交失败');
    }
  } catch (error) {
    // 验证失败或其他错误，显示错误消息
    ElMessage.error('提交过程中发生错误');
  }
};


//------------------------------------------------------------------------------------编辑表单中的提交按钮
// -----------------------------------------------------------------------------------编辑表单中的提交按钮
const submitForm1 = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    // 验证表单
    // await formEl.validate();

    // 准备要发送的数据
    const formData1 = {
      username: ruleForm1.username,
      name: ruleForm1.name,
      phone: ruleForm1.phone,
      gender: ruleForm1.gender,
      password: ruleForm1.password,
      address: ruleForm1.address,
      // 根据后端需求，可以添加更多字段
    };

    // 发送 POST 请求到后端 API
    const response = await request.post('/seller/updateUser', formData1);

    if (response.data && response.data.code === 0) {
      // 提交成功，显示成功消息
      ElMessage.success('提交成功');

      // 关闭弹窗
      dialogVisible1.value = false;

      // 重置表单
      formEl.resetFields();

      // 刷新表格数据
      fetchTableData();
    } else {
      // 提交失败，显示错误消息
      ElMessage.error(response.data.message || '提交失败');
    }
  } catch (error) {
    // 验证失败或其他错误，显示错误消息
    ElMessage.error('提交过程中发生错误');
  }
};


// ----------------------------------------
// 获取表格数据的方法
const fetchTableData = () => {
  request.get('/seller/getDate',   {
        params:{
          pageSize:pageSize4.value,
          pageNum:currentPage4.value,
          name:input2.value,
          begin:value1.value,
          end:value2.value
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

