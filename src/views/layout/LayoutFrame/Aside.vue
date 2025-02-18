<template>
  <el-container style="width: 100%;height: 60px;background-color: #001529;padding: -10px;margin: 0">
    <el-text style="margin: auto auto;color: #fff;"><el-icon><HomeFilled /></el-icon> 后端管理平台</el-text>
  </el-container>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="vertical"
      background-color="#001529"
      text-color="#fff"

      @select="handleSelect"
  >

    <el-sub-menu index="1">
      <template #title><el-icon><Avatar /></el-icon>买家管理</template>
      <el-menu-item index="1-1" @click="goBuyerPersonal()"><el-icon><Avatar /></el-icon>个人信息管理</el-menu-item>
      <el-menu-item index="1-2" @click="goOrder"><el-icon><List /></el-icon>订单管理</el-menu-item>
      <el-menu-item index="1-3" @click="goShopCart"><el-icon><ShoppingTrolley /></el-icon>购物车</el-menu-item>
      <el-menu-item index="1-4" disabled><el-icon><Wallet /></el-icon>钱包</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title><el-icon><Avatar /></el-icon>卖家管理</template>
      <el-menu-item index="2-1" @click="goSellerPersonal()"><el-icon><Avatar /></el-icon>卖家信息管理</el-menu-item>
      <el-menu-item index="2-2" @click="gostore"><el-icon><Shop /></el-icon>店铺信息管理</el-menu-item>
      <el-menu-item index="2-3" @click="gosellerPro"><el-icon><Goods /></el-icon>农产品管理</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title><el-icon><Menu /></el-icon>农产品可视化</template>
        <el-menu-item @click="goviewSeller" index="2-4-1"><el-icon><Histogram /></el-icon>农产品销售情况</el-menu-item>
      </el-sub-menu>

      <!--      <el-sub-menu index="2-4">-->
<!--        <template #title>item four</template>-->
<!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
<!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
<!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
<!--      </el-sub-menu>-->
    </el-sub-menu>
<!--    <el-sub-menu index="3">-->
<!--      <template #title ><el-icon><Promotion /></el-icon>物流管理</template>-->
<!--      <el-menu-item disabled index="3-1"><el-icon><Avatar /></el-icon>人员信息管理</el-menu-item>-->
<!--      <el-menu-item disabled index="3-2"><el-icon><Van /></el-icon>物流订单管理</el-menu-item>-->
<!--      <el-menu-item disabled index="3-3"><el-icon><WalletFilled /></el-icon>物流钱包</el-menu-item>-->
<!--    </el-sub-menu>-->
    <el-sub-menu index="4">
      <template #title><el-icon><UserFilled /></el-icon>管理员管理</template>
      <el-menu-item index="4-1" @click="goAdminPersonal"><el-icon><Avatar /></el-icon>管理员信息管理</el-menu-item>
<!--      <el-menu-item index="4-2"></el-menu-item>-->
<!--      <el-menu-item index="4-3"></el-menu-item>-->
    </el-sub-menu>
<!--    <el-menu-item index="3" disabled>Info</el-menu-item>-->
<!--    <el-menu-item index="4">Orders</el-menu-item>-->
  </el-menu>
  <div class="h-6" />
<!--background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"-->
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter} from "vue-router";
import store from '@/store/store'

const router = useRouter();
//----------------------------------------------------------跳转到管理员个人信息页面
const goAdminPersonal = () => {
  router.push('/manager');
  store.commit('addTag', '管理员个人信息');
}
//----------------------------------------------------------跳转到卖家农产品管理页面
const gosellerPro = () => {
  router.push('/managerSellerPro');
  store.commit('addTag', '农产品管理');
}
//----------------------------------------------------------跳转到buyer订单管理页面
const goOrder = () => {
  router.push('/order');
  store.commit('addTag', '订单管理');
}
//----------------------------------------------------------跳转到卖家店铺信息页面
const gostore = () => {
  router.push('/managerStore');
  store.commit('addTag', '店铺信息管理');
}

//----------------------------------------------------------跳转到买家个人信息页面
const goBuyerPersonal = () => {
  store.commit('addTag', '买家个人信息');
  router.push('/BuyerPerson');
}

//----------------------------------------------------------跳转到卖家个人信息页面
const goSellerPersonal = () => {
  store.commit('addTag', '卖家个人信息');
  router.push('/SellerPerson');
}
//----------------------------------------------------------跳转到购物车页面
const goShopCart = () => {
  store.commit('addTag', '购物车管理');
  router.push('/shopCart');
}
//----------------------------------------------------------跳转到卖家信息可视化页面
const goviewSeller = () => {
  router.push('/managerViewseller');
  store.commit('addTag', '农产品销售情况');
}






















const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
