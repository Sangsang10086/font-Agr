<template>
  <el-card style="padding: 10px;margin: 20px">
    <div class="login-container">
      <h2>修改密码</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input
              type="text"
              id="username"
              v-model="form.username"
              required
              placeholder="请输入用户名"
          />
        </div>

        <div class="form-group">
          <label for="password">原密码:</label>
          <input
              type="password"
              id="password"
              v-model="form.oldPassword"
              required
              placeholder="请输入原密码"
          />
        </div>
        <div class="form-group">
          <label for="password">新密码:</label>
          <input
              type="password"
              id="password"
              v-model="form.newPassword"
              required
              placeholder="请输入新密码"
          />
        </div>


        <div style="display: flex; justify-content: space-between;">
          <button type="button" style="width: 150px" @click="goBack">返回</button>
          <button type="submit" style="width: 150px" @click="handleLogin">提交</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </el-card>

</template>

<script setup>
import { reactive, ref } from 'vue';
import request from "@/util/request.js";
import {ElMessage} from "element-plus";
import { useRouter } from 'vue-router';

const router = useRouter();
// 表单数据
const form = reactive({
  username: '',
  oldPassword: '',
  newPassword: ''
});

// 错误消息
const errorMessage = ref('');

// 处理登录
const handleLogin = () => {
  // 简单的验证示例
  if (form.username === '' || form.oldPassword === '' || form.newPassword === '') {
    errorMessage.value = '用户名和密码不能为空';
    return;
  }


  request.post('/manager/changePassword', form).then(res => {
    if (res.data && res.data.code === 0) {
      errorMessage.value = '修改成功,请重新登录';
      // // 清除用户数据
      sessionStorage.removeItem("user");
      router.push('/');
    } else{
      errorMessage.value='请输入正确的用户名和密码';
    }
})
};
const goBack = () => {
  window.history.back();
}


</script>

<style scoped>
.login-container {
  width: auto;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 0px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {

  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;

  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #38a169;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>