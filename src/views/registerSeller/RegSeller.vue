<template>
  <div class="background-container">
    <el-card style="width: 400px" class="login-container" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>注册卖家</span>
        </div>
      </template>
      <el-form @keyup.enter="register" :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="Password2">
          <el-input v-model="form.Password2" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="width: 48%" type="primary" @click="goback">返回</el-button>
          <el-button style="width: 48% ;margin-left: 14px" type="primary" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item v-if="errorMessage">
          <div class="error">{{ errorMessage }}</div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>



</template>

<script setup lang="ts">
import { ref } from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton, ElCard, ElMessage} from 'element-plus';
import { useRouter } from 'vue-router';
import request from "@/util/request.js";

const form = ref({
  username: '',
  password: '',
  Password2: ''
});

const errorMessage = ref('');

const router = useRouter();
//====================================================================================验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      contains: (rule, value, callback) => {
        if (value !== form.value.Password2) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }
    }
  ],
  Password2: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};
// =====================================================================================注册
const register = () => {

  request.post('/user/sellerRegister', form.value).then( res => {
    if(res.data && res.data.code === 0){
      ElMessage.success('注册成功，请重新登录');

      router.push('/login')
    } else {
      ElMessage.error('注册失败');
    }
  })

};
// =========================================================================================返回
const goback = () => {
  router.push('/')
}
</script>

<style scoped>
.background-container {
  background-image: url('@/assets/loginbackimg.jpeg');
  background-size: cover; /* 确保背景图覆盖整个容器 */
  background-position: center; /* 确保背景图居中 */
  background-repeat: no-repeat; /* 防止背景图重复 */
  height: 100vh; /* 确保背景图覆盖整个视口高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  max-width: 400px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;

}

.card-header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

</style>