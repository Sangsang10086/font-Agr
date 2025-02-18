<template>
  <el-container >


        <el-button @click="topbutton" style="font: 12px Roboto"  type="" link>助农电商首页</el-button>
        <el-button @click="toorder" style="font: 12px Roboto" type="" link>订单管理</el-button>
        <el-button @click="cart" style="font: 12px Roboto" type="" link>购物车</el-button>
        <el-button @click="Regseller" style="font: 12px Roboto" type="" link>成为卖家</el-button>
        <el-button v-if="!user.data" @click="login" style="margin-left: 800px;font: 12px Roboto" type="warning" link>登录</el-button>
        <el-button v-if="user.data" style="margin-left: 800px;font: 12px Roboto;" type="warning" link>{{user.data.username}}</el-button>

        <el-button @click="register" style="font: 12px Roboto" type="" link>免费注册</el-button>
        <el-button @click="goPerson" style="font: 12px Roboto" type="" link>个人信息</el-button>
        <el-button @click="quitlogin" style="font: 12px Roboto" type="" link>退出登录</el-button>






  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const user = JSON.parse(localStorage.getItem("user") || "{}")
const  router = useRouter();
// =================================================已购买农产品
const toorder = () => {
  // router.push('/order')
  window.location.href = '/OrderLayout';
}
// =================================================首页
const topbutton = () => {
  // router.push('/')
  window.location.href = '/';
}
// =================================================购物车
const cart = () => {
  // router.push('/cart')
  window.location.href = '/cart';
}
// =================================================免费开店
const Regseller = () => {
  // router.push('/Regseller')
  window.location.href = '/regSeller';
}

//-------------------------------------------------登录
const login = () => {
  // window.location.reload()
  // router.push('/login')
  window.location.href = '/login';
}
// =================================================注册
const register = () => {
  // router.push('/buyer/register')
  window.location.href = '/buyer/register';
}
// =================================================个人信息
const goPerson = () => {
  // router.push('/BuyerPersonLayout')
  window.location.href = '/BuyerPersonLayout';
}

// ================================================退出登录
const quitlogin = () => {
  localStorage.clear();
  window.location.href = '/';
}

</script>



<style scoped>
.demo-radius .title {
  color: var(--el-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--el-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>