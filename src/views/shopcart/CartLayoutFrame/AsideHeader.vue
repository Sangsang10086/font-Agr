<template>
  <el-col>
    <el-container >
      <img src="@/assets/favicon.png" style="width:80px;height:80px;margin-top: 10px">
      <el-text style="font-size: 25px ;color: #ff5000 ;font-weight:550;margin-top: 10px">
        购物车
      </el-text>

    </el-container>
    <el-container>
      <el-tabs>
        <el-tab-pane @click="goAll" style="" label="全部商品" >

        </el-tab-pane>
<!--        <el-tab-pane label="Config" name="second">Config</el-tab-pane>-->
      </el-tabs>
    </el-container>
  </el-col>





</template>

<script setup lang="ts">

const goAll = () => {
  window.location.href = "/cart";
}
</script>
<style scoped>

</style>