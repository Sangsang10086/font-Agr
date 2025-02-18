<template>
  <el-card style="padding: 10px;margin: 20px">
    <el-row >
      <div class="demo-input-size" style="padding: 10px">
        <!--      输入框-->
        <span class="demonstration">商品信息：</span>
        <el-input
            v-model="input2"
            class="w-50 m-2"
            placeholder="请输入商品信息"
            :suffix-icon="Search"
            style="width: 200px"
            clearable
        />
      </div>

      <div class="block" style="padding: 10px">
        <span class="demonstration">商品上架时间：</span>
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
        <el-button type="primary" @click="tianjiaxinxi">添加信息</el-button>
      </div>
    </el-row>
    <el-divider border-style="double" />
    <!-- ---------------------------------------------------------表格属性------------------------------------- -->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="商品ID" width="80" />
      <!--    <el-image :src="" style="width: 100px; height: 100px"></el-image>-->
      <el-table-column fixed prop="storeName" label="商品名" width="100" />
      <el-table-column prop="storeSort" label="商品种类" width="100" />
      <el-table-column  prop="storeMoney" label="商品价格" width="100" />
      <el-table-column  prop="storeIndate" label="商品上架时间" width="120" />
      <el-table-column  prop="storeDetail" label="商品详情" width="150" />
      <el-table-column  prop="storeSize" label="商品数量" width="80" />
      <el-table-column  prop="storeSellNum" label="商品已售量" width="100" />
      <el-table-column  prop="storeStore" label="商品店铺名" width="100" />

      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template #default="scope">
          <el-button plain type="info" size="small" @click="handleBianji(scope.row)" disabled>
            编辑
          </el-button>
          <el-button plain type="danger" size="small" @click="handleDelete(scope.row)" disabled>
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
          :disabled="disabledPage"
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
      v-model="dialogVisibleAddmsg"
      width="800px"
  >
    <el-form
        ref="ruleFormRefCreTable"
        :model="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
    >
      <el-row>
        <el-form-item label="商品名：">
          <el-input style="width: 240px" v-model="ruleForm.proName" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="商品价格：">
          <el-input style="width: 240px" v-model="ruleForm.proPrice" placeholder="请输入商品价格" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="商品数量：">
          <el-input style="width: 240px" v-model="ruleForm.proNum" placeholder="请输入商品数量" />
        </el-form-item>
        <el-form-item label="上架商店：">
          <el-select style="width: 240px" v-model="ruleForm.proStore" placeholder="请选择商品上架的商店">
            <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-form-item label="商品详情：">
        <el-input style="width: 600px" v-model="ruleForm.proDetail" type="textarea" placeholder="请输入商品详情" />
      </el-form-item>
      <!-- 上传图像 -->
      <el-form-item label="商品图片：">
        <el-upload
            ref="uploadRef"
            action="http://localhost:8080/upload"
            list-type="picture-card"
            :auto-upload="true"
            :on-success="handleSuccess"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div v-if="file.url">
              <img  class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span  class="el-upload-list__item-actions">
              <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
              >
                <el-icon><ZoomIn /></el-icon>
              </span>
              <span
                  v-if="!disabledUpload"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
            </div>
          </template>
        </el-upload>



        <el-dialog v-model="dialogVisibleUpload">
          <img :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item style="margin-left: 470px">
        <el-button @click="dialogVisibleAddmsg = false">取消</el-button>
        <el-button type="primary" @click="submitFormCre">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--  ------------------------------------------------------------------------------编辑按钮提示弹框-->
  <el-dialog
      title="添加信息"
      v-model="dialogVisibleedit"
      width="800px"
  >
    <el-form
        ref="ruleFormRefEditTable"
        :model="ruleForm"

        label-width="120px"
        class="demo-ruleForm"
        status-icon
    >
      <!--      :rules="rules"-->
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
        <el-button  @click="dialogVisibleedit = false">取消</el-button>
        <el-button  type="primary" @click="">
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
import {Delete, Download, Plus, Search, Upload, ZoomIn} from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage} from 'element-plus';
import request from  '@/util/request';
import { useRouter} from "vue-router";
import type { FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'


const user = JSON.parse(localStorage.getItem('user') || '{}');
const router = useRouter();
// ------------------------------------------------------

//---------------------------------------------处理输入框
const input2 = ref('')
//添加信息弹窗
// ---------------------------------------------定义对话框的显示状态
const dialogVisibleAddmsg = ref(false);
const dialogVisibleedit = ref(false);
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
//-----------------------------------------------添加弹窗数据定义
const ruleFormRefCreTable = ref<FormInstance>()

//-----------------------------------------------编辑弹窗数据定义
const ruleForm1 = reactive<RuleForm1>({
  username: '',
  name: '',
  phone: '',
  gender: '',
  password: '',
  address: '',
})

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
// ---------------------------------------------------------------------图片上传


import type { UploadFile } from 'element-plus';



// 表单数据对象
const ruleForm = ref({
  proName: '',
  proPrice: '',
  proNum: '',
  proStore: '',
  proDetail: '',
  file: '',
  sellerId: user.data.id,
});
// 存储选择的文件

const dialogImageUrl = ref('');
const dialogVisibleUpload = ref(false);
const disabledUpload = ref(false);

const options = ref([
]);
//------------------------------------------------------------------------------添加信息
const tianjiaxinxi = () => {
  dialogVisibleAddmsg.value = true;
  fetchSelectData();
}

//---------------------------------------------------------------------------------------获取下拉选项的商店信息
const fetchSelectData = () => {
  request.get('/backSellerFetchStore', {params:{sellerId:user.data.id}}).then(res => {
    if (res.data && res.data.code === 0) {
      options.value = res.data.data;
    }
  })
}

//-----------------------------------------------------------上传成功
const handleSuccess = (response: any,file: UploadFile) => {
  if (response) {
    ruleForm.value.file = response;
    file.response=response;
  }else {
    ElMessage.error('上传失败');
  }
}
//处理提交按钮
const submitFormCre = () => {
  request.post('/addSellerPro',ruleForm.value).then(res => {
    if (res.data && res.data.code === 0){
      ElMessage.success('添加成功');
    }else {
      ElMessage.error('添加失败');
    }
  })
  dialogVisibleAddmsg.value = false;
};


//----------------------------------------------------------------------------------------------------上传图片的删除功能
import {ElUpload} from "element-plus";
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const handleRemove = (file: UploadFile) => {
  request.post('/uploadDelete', {
    file: file.response
  },{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    if (res.data){
      ruleForm.value.file = '';
      file.url = '';

      // 清除上传组件中的文件
      if (uploadRef.value) {
        uploadRef.value.clearFiles();
      }
      ElMessage.success('删除成功');
    }else {
      ElMessage.error('删除失败');
    }
  })
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisibleUpload.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};


//----------------------------------------------------------------------------------------------------处理编辑按钮事件
const handleBianji = (row) => {
  dialogVisibleedit.value  = true;
  request.get('/buyer/getUserByUsername', {params:{username:row.username}}).then(res => {
    if (res.data && res.data.code === 0) {
      ruleForm1.username = res.data.data.buyerUsername;
      ruleForm1.name = res.data.data.buyerName;
      ruleForm1.phone = res.data.data.buyerPhone;
      ruleForm1.gender = res.data.data.buyerGender;
      ruleForm1.password = res.data.data.buyerPassword;
      ruleForm1.address = res.data.data.buyerAddress;
    } else {
      ElMessage.error('获取用户信息失败');
    }
  });
}
// ----------------------------------------------------------------------------------------------------处理删除按钮事件
const handleDelete = (row) => {
  request.delete('/buyer/deleteByUsername', {params:{username:row.username}}).then(res => {
    if (res.data && res.data.code === 0) {
      ElMessage.success('删除成功');
      fetchTableData();
    } else {
      ElMessage.error('删除失败');
    }
  });
}




//------------------------------------------------------------------------------------编辑表单中的提交按钮
// -----------------------------------------------------------------------------------编辑表单中的提交按钮
const submitFormEdit = async (formEl: FormInstance | undefined) => {
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
    const response = await request.post('/buyer/updateUser', formData1);

    if (response.data && response.data.code === 0) {
      // 提交成功，显示成功消息
      ElMessage.success('提交成功');

      // 关闭弹窗
      dialogVisibleedit.value = false;

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
  request.get('/sellerPro/getDate',   {
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

