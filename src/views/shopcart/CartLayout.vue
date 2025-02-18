<template>
  <el-container>

    <el-header class="header" style="height: 35px">
      <Header />
    </el-header>

    <el-container>

      <el-aside style="width: 60% ;margin: 0 auto" >

        <el-container  style="padding: 0px;margin-left: 12px">

          <el-header style="height: 110px;">
            <HeaderTwo />
          </el-header>

          <el-main style="padding: 0px;width: 95% ;margin: 0 auto;margin-top: 20px">
            <router-view></router-view>
          </el-main>

        </el-container>
      </el-aside>

      <el-main>
        <SumMain />
      </el-main>
    </el-container>


  </el-container>
</template>

<script setup lang="ts">
import Header from "@/views/font/LayoutFrame/Header.vue";
import HeaderTwo from '@/views/shopcart/CartLayoutFrame/AsideHeader.vue'
import SumMain from "@/views/shopcart/CartLayoutFrame/SumMain.vue";
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
}
</style>