<template >

<!--  大容器-->
  <el-container style="width: 90% ;margin: 0 auto " >
    <!--  -------------------------------------------------------------------------  搜索框那一栏-->
    <el-header style="height: 87px ;width: 100%;padding:0px 16px 16px;margin-top: 16px">
        <!--     边框中加搜索框-->
        <el-row style="width: 80%;margin: 0 auto">
          <!--        logo-->
          <img :src="logo" style="width: 160px;height: 72px" />
          <!--边框-->
          <div  style="width: 70%;margin: 15px;height: 44px">
            <!--分类选择框-->
            <div  style="border-radius: 15px;border: 2px solid #ff8133;height: 44px">

              <!--            输入框-->
              <!-- 输入框 -->
              <el-input    style="width: 100%; height: 44px; border-radius: 10px; display: flex;align-items: center;margin-left: 15px"
                           v-model="serchValue"
                           placeholder="输入农产品信息搜索..."
              >
<!--                <template #prefix>-->
<!--                  <el-select v-model="value"-->
<!--                             placeholder="分类"-->
<!--                             size="large"-->
<!--                             style="width: 80px;border-radius: 20px;margin:2px"-->
<!--                             collapse-tags-tooltip:true-->
<!--                  >-->
<!--                    <el-option-->
<!--                        v-for="item in options"-->
<!--                        :key="item.value"-->
<!--                        :label="item.label"-->
<!--                        :value="item.value"-->
<!--                    />-->
<!--                  </el-select>-->
<!--                </template>-->
                <template #suffix>
                  <el-button
                      style="width: 80px; height: 40px; border-radius: 10px; font-size: 16px;margin: 2px 17px 2px 0 ;
                            background-color: #ff5000;
                            border-color: #ff8133;
                            color: white;"
                      @click="getProducts"
                  >
                    搜索
                  </el-button>
                </template>
              </el-input>
            </div>
          </div>
        </el-row>
    </el-header>
    <!-- ------------------------------------------------------------------ 推荐商品列表 -->
    <div class="recommended-products">
      <el-row >
        <div style="margin: 3px;border-radius: 7px" class="hover-border" v-for="product in products" key="product.id">
          <el-card @click="dianjigoumai(product)"  :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 7px;height: 405px;width: 240px;border-color: transparent">
            <el-image :src="product.image" class="product-image" style="height: 240px;width: 240px;border-radius: 5px;border-color: transparent;" alt=""/>
            <div style="width: 214px;height: 69px;margin-left: 10px;margin-top: 10px;margin-right: 10px">
              <el-text style="margin:2px;font-size: 16px;">{{ product.text }}</el-text>
            </div>
            <div style="padding: 14px 14px 0 14px;width: 214px;height: 30px;">
              <el-text  style="color:#ff6200 ;font-size: 16px;">¥</el-text>
              <time class="time"
                    style="color: #ff6200;font-size: 22px;font-weight: bold"
              >{{ product.price }}</time>

              <el-text style="font-size: 14px;margin-left: 10px">
                 {{product.num}}+人付款
              </el-text>

            </div>
            <div style="width: 214px;height: 32px;margin-left: 14px">
              <span style="font-size: 14px ;">{{ product.storeName }}</span>
            </div>
          </el-card>
        </div>
      </el-row>
    </div>
  </el-container>

</template>


<script setup>

import {onMounted, ref} from 'vue';
import {ElCarousel, ElCarouselItem, ElRow, ElCol, ElCard, ElButton, ElMessage} from 'element-plus';
import request from "@/util/request.js";
import { useTopStore} from "@/store/user.js";
import logo from "@/assets/111.png";
import router from "@/router/index.js";

const topStore = useTopStore();

// ===========================================================================生命周期钩子预先渲染页面
onMounted(() => {
  getProducts();
});
// ===========================================================================卡片信息
const products = ref([]);
//-------------------============================================------------------------------下拉框
const value = ref('');
const options = [
  {
    value: '',
    label: ''
  }
];

// 获取下拉框数据
const getCategory =async () => {
  await request.get('/getCategory').then(res => {
    if (res.data && res.data.code === 0) {
      // 处理返回的数据，去除重复项并生成新的 options 数组
      const categories = Array.from(new Set(res.data.data));
      options.length = 0; // 清空现有的 options
      categories.forEach(category => {
        options.push({
          value: category,
          label: category
        });
      });

      // 如果你使用的是 Vue.js，确保让 Vue 知道 options 已更新
      this.$forceUpdate(); // 或者使用响应式的方法，如 this.options = [...options]
    } else {
      ElMessage.error('获取分类失败');
    }
  })
};
//==================================================================================点击购买
const dianjigoumai = (product) => {
  // console.log('Clicked product:', product); // 添加这一行
  topStore.setFormData(product)
  router.push('/detailLayout')
  // window.location.href = '/detailLayout';
};
//=================================================================================搜索
const serchValue = ref('');

const getProducts = () => {
  request.get('/getProducts', {
    params: {
      category: value.value,
      text: serchValue.value
    }
  }).then(res => {
    if (res.data && res.data.code === 0) {
      products.value = res.data.data.map(product => {
        if (product.image) {
          // 这里假设前端访问后端图片的基础路径是 /uploads
          product.image = `/uploads${product.image}`;
        }
        return product;
      });
      console.log('Products data:', products.value);
    } else {
      ElMessage.error('获取数据失败');
    }
  });
}



</script>




<style scoped>




.category-item img {
  width: 40px;
  height: 40px;
}

.recommended-products {
  padding: 20px 0;
}

.product-image {
  width: 100%;
  display: block;
}

.hover-border {
  padding: 2px;
  transition: border 0ms; /* 可选：添加过渡效果 */
}

.hover-border:hover {
  border: 1px solid #ff8133; /* 设置边框样式 */
}


::v-deep .el-input__wrapper {
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}



</style>