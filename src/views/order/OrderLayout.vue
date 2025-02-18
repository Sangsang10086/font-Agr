<template>
  <el-container  >
    <el-header class="header" style="height: 35px">
      <Header />
    </el-header>
    <el-main style="padding: 0">
      <router-view></router-view>
    </el-main>

  </el-container>


</template>
<script setup lang="ts">
import Header from "@/views/font/LayoutFrame/Header.vue";
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
}
</style>