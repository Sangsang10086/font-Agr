<template>
  <el-container style="padding: 0;margin:0;height: 660px;">
    <el-aside  width="200px" style="margin: 0;padding: 0;height: 660px;background-color: #001529">
      <Aside/>
    </el-aside>
    <el-main style="padding: 0px;height: 100%" >
      <el-header style="padding: 0px;width: 100%;height: 9%">
        <Header />
      </el-header>
      <el-container style="height: 90%">
        <el-header height="5%" style="margin-top: 5px">
          <MainTag/>
        </el-header>
        <el-main   style="padding-top: 0px;background-color: #f1f2f6;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script setup>
import Header from '@/views/backSeller/LayoutFrame/Header.vue';
import Aside from "@/views/backSeller/LayoutFrame/Aside.vue";
import MainTag from "@/views/backSeller/LayoutFrame/MainTag.vue";
</script>

