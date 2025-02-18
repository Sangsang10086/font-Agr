<template>
  <el-form :model="form" label-width="120px">
    <el-row>
      <el-form-item label="用户名：">
        <el-input style="width: 250px" :readonly=true v-model="form.username" />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input style="width: 250px" :readonly="isReadonly" v-model="form.name" />
      </el-form-item>
    </el-row>
    <el-form-item  label="性别：">
      <el-radio-group v-model="form.gender">
        <el-radio border  label="男" />
        <el-radio border  label="女" />
      </el-radio-group>
    </el-form-item>
    <el-row>
      <el-form-item label="手机号：">
        <el-input style="width: 250px" :readonly="isReadonly" v-model="form.phone" />
      </el-form-item>
      <el-form-item  label="出生日期：">
        <el-col >
          <el-date-picker
              v-model="form.data"
              type="date"
              placeholder="选择日期"
              style="width: 250px"
          />
        </el-col>
      </el-form-item>
    </el-row>








    <el-form-item label="地址：">
      <el-input :readonly="isReadonly" v-model="form.address" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button  type="primary" @click="bianji">编辑</el-button>

    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {ElFormItem} from "element-plus";
import {useRouter} from "vue-router";
import {useUserStore}  from '@/store/user'
import request from "@/util/request";
const router = useRouter()
const userStore = useUserStore()
//==============================================表单数据
const form = reactive({
  username: '',
  name: '',
  gender: '',
  phone: '',
  data: '',
  address: '',
})
onMounted(() => {
  const storedUser =localStorage.getItem("user");

  if(storedUser){
    const user = JSON.parse(storedUser);
    request.get('/fontBuyerPerson/getDate', {params:{id:user.data.id}}).then( res =>{
      if(res.data && res.data.code === 0){
        form.username = user.data.username;
        form.name = res.data.data.name;
        form.gender = res.data.data.gender;
        form.phone = res.data.data.phone;
        form.data = res.data.data.data;
        form.address = res.data.data.address;
        userStore.setFormData(res.data);
      }else {
        userStore.fetchUserData();
      }
    })
  }

});


const isReadonly = ref(true)
//==============================================编辑按钮
const bianji = () => {
  window.location.href = '/EditBuyerPerson';
  // router.push('/EditBuyerPerson');
}
//==============================================取消按钮
const cancel = () => {
  // router.push('/');
  window.location.href = '/';
}



</script>
