<template>
  <el-container style="width: 100%;height: 60px;background-color: #001529;padding: -10px;margin: 0">
    <el-text style="margin: auto auto;color: #fff;"><el-icon><HomeFilled /></el-icon>后端管理平台</el-text>
  </el-container>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="vertical"
      background-color="#001529"
      text-color="#fff"
      @select="handleSelect"
  >


      <el-menu-item index="2-1" @click="gosellerOrder"><el-icon><Sell /></el-icon>订单管理</el-menu-item>
      <el-menu-item index="2-2" @click="gostore"><el-icon><Shop /></el-icon>店铺信息管理</el-menu-item>
      <el-menu-item index="2-3" @click="gosellerPro"><el-icon><Goods /></el-icon>农产品管理</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title><el-icon><Menu /></el-icon>农产品可视化</template>
        <el-menu-item @click="goviewSeller" index="2-4-1"><el-icon><Histogram /></el-icon>农产品销售情况</el-menu-item>
      </el-sub-menu>



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

const gostore = () => {
  router.push('/store');
  store.commit('addTag', '店铺信息管理');
}

const gosellerPro = () => {
  router.push('/sellerPro');
  store.commit('addTag', '农产品管理');
}
const goviewSeller = () => {
  router.push('/viewSelled');
  store.commit('addTag', '农产品销售情况');
}

const gosellerOrder = () => {
  store.commit('addTag', '订单管理');
  router.push('/gosellerOrder');
}

const router = useRouter();
























const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
