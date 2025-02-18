<template>
  <div class="background-container">
    <el-card style="width: 400px" class="login-container" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="width: 48%" type="primary" @click="login">登录</el-button>
          <el-button style="width: 48% ;margin-left: 14px" type="primary" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item v-if="errorMessage">
          <div class="error">{{ errorMessage }}</div>
        </el-form-item>
      </el-form>
      <el-button @click="goTop"  link >暂不登录，返回首页</el-button>
    </el-card>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton, ElCard, ElMessage} from 'element-plus';
import { useRouter } from 'vue-router';
import request from "@/util/request.js";

const form = ref({
  username: '',
  password: ''
});

const formRef = ref(null);
const errorMessage = ref('');

const router = useRouter();
//====================================================================================验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};
// =====================================================================================登录
const login = () => {
  formRef.value.validate().then(() => {

    request.post('/loginTotal', form.value).then( res => {
      if(res.data.data && res.data.code === 0 ){

        localStorage.setItem("user", JSON.stringify(res.data));
        if(res.data.data.role === 'buyer'){
          router.push('/')
          ElMessage.success('登录成功');
        }else if(res.data.data.role === 'seller'){
          router.push('/sellerTop')
          ElMessage.success('登录成功');
        }else if(res.data.data.role === 'manager'){
          router.push('/layout')
          ElMessage.success('登录成功');
        }
      } else {
        ElMessage.error('登录失败');
      }
    })
  }).catch(() => {
    // 验证失败，显示错误信息
    errorMessage.value = '请输入用户名和密码';
  });
};
//=======================================================================================注册
const register = () => {
  router.push('/buyer/register');
};
// ==========================================================================================返回首页
const goTop = () => {
  router.push('/');
};
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
  margin: 100px auto;
  padding: 30px;
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