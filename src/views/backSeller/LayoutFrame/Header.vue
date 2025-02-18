<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div style="margin-left:auto ;margin-top: 7px">
      <el-avatar style="font-size:13px;" :size="40">{{user.data.username}}</el-avatar>
    </div>
    <el-sub-menu index="2">
      <template #title>个人中心</template>
      <el-menu-item index="2-1" @click="goPersonal()">个人信息</el-menu-item>
      <el-menu-item index="2-2"@click="ChangePW">修改密码</el-menu-item>
      <el-menu-item index="2-3" @click="logout()">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from "@/store/store.js";

const activeIndex = ref('1');
const router = useRouter();
const user = JSON.parse(localStorage.getItem("user")|| '{}');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
// ===============================================================返回首页
const goMain = () => {
  router.push('/sellerTop');
};
// ===============================================================个人信息
const goPersonal = () => {
  store.commit('addTag', '个人信息');
  router.push('/person');
};
// ===============================================================退出登录
const logout = () => {
  localStorage.clear();
  router.push('/');
};
// ===============================================================修改密码
const ChangePW = () => {
  store.commit('addTag', '修改密码');
  router.push('/changePassword');
};


</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
