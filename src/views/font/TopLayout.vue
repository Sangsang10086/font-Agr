<template>
  <el-container  >
    <el-header class="header" style="height: 35px">
      <Header />
    </el-header>
    <el-main style="padding: 0">
      <router-view></router-view>
    </el-main>
    <el-footer class ="footer">
      <Footer />
    </el-footer >
  </el-container>


</template>

<script>
import Header from "@/views/font/LayoutFrame/Header.vue";
import Footer from "@/views/font/LayoutFrame/Footer.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {Footer, Header}
})

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
}
.footer {
  text-align: center;
  padding: 20px 0;
  background-color: #f5f5f5;
}
el-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

el-main {
  flex: 1;
  overflow-y: auto; /* 可选：添加滚动条 */
}


</style>