

<template>
  <el-card>
    <el-text>结算明细</el-text>
    <el-divider />
    <!-- 遍历 formData 数组，渲染每个商品的卡片 -->
    <div v-for="(item, index) in formData" :key="index">
      <div style="height:130px;width: 500px;display: flex">
<!--        <div style="width: 20px;height: 130px;align-content: center">-->
<!--          <el-checkbox></el-checkbox>-->
<!--        </div>-->
        <div style="width: 130px;height: 130px;margin-left: 5px">
          <el-image style="width: 130px;height: 130px;border-radius: 10px" :src="item.img"></el-image>
        </div>

        <div style="height: 130px;width: 365px;display: flex">
          <div style="width: 230px;height: 130px;margin-left: 10px;display:block;padding: 0">
            <el-text style="width: 230px;">{{ item.detail }}</el-text>
            <el-input-number style="margin: 30px 40px " v-model="item.num" :min="1" />

          </div>
          <div style="width: 80px;height: 130px;margin-left: 10px;align-content: center">
            <el-text  style="font-size: 20px;color: #ff5000">￥</el-text>
            <el-text style="font-size: 30px;color: #ff5000">{{itemTotalPrices[index] }}</el-text>
          </div>
        </div>
      </div>
      <el-divider />
    </div>
    <div>
      <el-text>合计：</el-text>
      <el-text style="font-size: 20px;color: #ff5000">￥</el-text>
      <el-text style="font-size: 35px;color: #ff5000">{{totalPrice}}</el-text>
      <el-button style="margin-left: 244px" type="primary" @click="handleCheckout">
        结算
      </el-button>
    </div>

  </el-card>
</template>

<script setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
import { useShopStore} from "@/store/user.js";
import {storeToRefs} from "pinia";
import router from "@/router/index.js";

const shopStore = useShopStore()
const { formData } = storeToRefs(shopStore)
const produces = ref([])
const user = JSON.parse(localStorage.getItem('user')|| {})


// const jiesuan =()=>{
//   shopStore.submitForm(formData,user.data.id);
//   window.location.href = '/OrderLayout';
// }
// 可选：初始化时确保 totalPrice 正确
onMounted(() => {
  totalPrice.value; // 触发一次计算
  itemTotalPrices.value
  console.log(formData)
});


// 新增方法处理点击事件
const handleCheckout = () => {
  shopStore.submitForm(formData.value, user.data.id);
  router.push('/OrderLayout'); // 使用 Vue Router 进行导航
};

// 计算总价
const totalPrice = computed(() => {
  return formData.value.reduce((total, item) => {
    return total + (Number(item.price) * Number(item.num));
  }, 0).toFixed(2);
});

// 计算每条记录的总价
const itemTotalPrices = computed(() => {
  return formData.value.map(item => {
    return (Number(item.price) * Number(item.num)).toFixed(1);
  });
});



</script>

<style scoped>



</style>