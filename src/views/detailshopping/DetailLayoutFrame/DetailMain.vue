<template>
  <el-container>

<!--    <el-header style="width: 100%;height: 80px;justify-content: center;display: flex;flex-direction: column;align-items: center">-->
<!--      <div style="width: 1269px;height: 44px;padding: 0 16px">-->
<!--        <el-text style="height: 40px;font-size: 35px">商品详情页</el-text>-->
<!--      </div>-->
<!--    </el-header>-->
    <div style="width: 1269px;align-items: center;margin-left:70px;padding: 0 16px">
      <el-card style="padding: 0;width: 100%;height: 600px; ">
        <el-row>
          <el-image :src="formData.image" style="width:600px;height: 516px;padding: 4px;border-radius: 35px"></el-image>
          <el-divider style="margin:5px;height: 516px;vertical-align: top" direction="vertical" />
          <div class="affix-container" style="height: 516px;justify-content: space-between;padding: 4px">
            <div style="width: 550px;height: 70px;padding: 10px">
              <el-text style="font-size: 16px">
                {{formData.text}}
              </el-text>
            </div>
            <div style="width: 550px;height: 70px;padding: 10px;">
              <el-text style="font-size: 16px">特价:￥</el-text><el-text style="font-size: 25px;color: #ff5000">{{formData.price}}</el-text>
            </div>
            <div style="width: 550px;height: 70px;padding: 10px;">
              <el-text style="font-size: 16px">购买数量：</el-text>
              <el-input-number  v-model="shopNum" :min="1" />
            </div>
            <div style="width: 550px;height: 70px;padding: 10px;">
              <el-text style="font-size: 16px">配送至：</el-text>
              <el-input style="width: 450px" v-model="address" placeholder="请输入地址" />
            </div>
            <div style="width: 550px;height: 70px;padding: 10px;">
              <el-text style="font-size: 16px">总价：：￥</el-text>
              <el-text style="font-size: 25px;color: #ff5000">{{TotalPrice}}</el-text>
            </div>
            <div style="padding: 10px">
              <el-button  style="margin-left: 300px" type="primary" disabled>立即购买</el-button>
              <el-button type="primary" @click="addShopCart">加入购物车</el-button>
            </div>
          </div>
        </el-row>

      </el-card>

    </div>

    <el-main>

    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import {useTopStore} from "@/store/user";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import request from "@/util/request";
import {ElMessage} from "element-plus";

const store = useTopStore();
const {formData} = storeToRefs(store)


const shopNum = ref(1)
const address = ref()
const id = ref()

onMounted(()=>{
  //获取form数据
  TotalPrice.value
})
// 计算总价
const TotalPrice = computed(() => {
  if (!formData.value) return '0.00';
  const price = Number(formData.value.price);
  const num = Number(shopNum.value);
  return (price * num).toFixed(2);
});

//发送加入购物车的请求
const user = JSON.parse(localStorage.getItem('user') || '{}');
const addShopCart = () => {
  id.value = formData.value.id
  request.post('/addShopCart', {
    buyerId:user.data.id,
    id:id.value,
    num:shopNum.value,
    address:address.value,
    totalPrice:TotalPrice.value

  }).then((res)=>{
    if(res.data.code===0){
      ElMessage.success('已加入购物车')
    }else{
      ElMessage.error('加入购物车失败')
    }
  })
  window.location.href = '/cart'
}
</script>



<style scoped>
.affix-container {
  border-radius: 20px ;
  border: 1px solid #409eff;
  background: var(--el-color-primary-light-9);
}
</style>