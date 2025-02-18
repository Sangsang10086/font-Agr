<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="padding: 0px"

  >



<!--    头像-->

    <div style="margin-left:auto ;margin-top: 7px">
      <el-avatar style="font-size:13px;" :size="40">{{user.data.username}}</el-avatar>
    </div>



    <el-sub-menu index="2">
      <template #title><el-icon><Tools /></el-icon>设置</template>
      <el-menu-item index="2-1" @click="goPersonal()">个人信息</el-menu-item>
      <el-menu-item index="2-2"@click="ChangePW">修改密码</el-menu-item>
      <el-menu-item index="2-3" @click="logout()">退出登录</el-menu-item>
<!--      <el-sub-menu index="2-4">-->
<!--        <template #title>item four</template>-->
<!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
<!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
<!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
<!--      </el-sub-menu>-->
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from "@/store/store.js";

const activeIndex = ref('1');
const router = useRouter();
// 头像

const user = JSON.parse(localStorage.getItem("user")|| '{}');


const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const goMain = () => {
  router.push('/layout');
};

const goPersonal = () => {
  store.commit('addTag', '个人信息');
  router.push('/managerPerson');
};

const logout = () => {
  localStorage.clear();
  router.push('/');
};

const ChangePW = () => {
  store.commit('addTag', '修改密码');
  router.push('/managerChangePassword');
};


</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>
