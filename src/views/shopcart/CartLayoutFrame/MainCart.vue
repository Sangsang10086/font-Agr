<template>
  <el-card style="width: 800px">
    <el-row style="height: 55px">
      <el-checkbox v-model="isChecked"  @change="handleSelectAllChange" >
        全选
      </el-checkbox>
      <el-button style="margin-left: 650px" type="danger" disabled>
        删除
      </el-button>
      <el-divider />
    </el-row>
    <div style="height: 180px" v-for="(form, index) in forms" :key="index" >
      <div style="padding: 2px 10px">
        <el-text>{{ form.storeName }}</el-text>
      </div>
      <div style="height: 130px;display: flex">
        <div style="height: 130px;width: 20px">
          <el-checkbox style="margin-top: 50px" v-model="form.selected" @change="handleItemChange(form)"></el-checkbox>
        </div>
        <div style="height: 130px;width: 130px">
          <el-image style="width: 130px;height: 130px;border-radius: 10px" :src="form.img"></el-image>
        </div>
        <div style="height: 130px;width:250px;margin-left: 10px;align-content: center">
          <el-text >
            {{ form.detail }}
          </el-text>
        </div>
        <div style="height: 130px;width: 80px;margin-left: 10px;align-content: center">
          <el-text style="color: #ff5000">￥</el-text>
          <el-text  style="font-size: 25px;color: #ff5000">{{ form.price }}</el-text>
        </div>
        <div style="height: 130px;width: 180px;margin-left: 10px;align-content: center">
          <el-input-number @change="handleNumChange(form)" v-model="form.num" :min="1" />
        </div>
        <div style="height: 130px;width: auto;;margin-left: 11px;align-content: center">
          <el-button type="danger" disabled>删除</el-button>
        </div>
      </div>

      <el-divider />
    </div>
  </el-card>









</template>
<script setup>
import {computed, onMounted, ref, watch} from "vue";
import { useShopStore} from "@/store/user.js";
import request from "@/util/request.js";
import {ElMessage} from "element-plus";
import {storeToRefs} from "pinia";

const shopStore = useShopStore();
//定义一个全选的选中状态
const isChecked = ref(false);

// 处理单个商品选中状态变化
const handleItemChange = (form) => {
  if (form.selected=== false){
    shopStore.rmFormData(form.id)
  }else if(form.selected===true){
    shopStore.setFormData(form);
  }
};


// 处理全选逻辑
const handleSelectAllChange = (val) => {
  forms.value.forEach((form) => {
    form.selected = val;
  })
};






//获取Form数据
const user = JSON.parse(localStorage.getItem('user'))
const forms = ref([])
onMounted(()=>{
  request.get('/getCartData', {
    params: {
      id: user.data.id
    }
  }).then(res=>{
    if (res.data && res.data.code === 0) {
      // 确保每个对象都有 selected 属性
      forms.value = res.data.data.map(item => {
        if (item.img){
          item.img = `/uploads${item.img}`;
        }
        return {
          ...item,
          // selected: false,
        };
      });
    }
    else {
      ElMessage.error('获取数据失败');
    }
  })
})

//=======================================================================================================================修改购物车中商品数量
const handleNumChange = (form) => {
  request.post('/updateCartNum', form).then(res => {
    if (res.data && res.data.code === 0) {
      console.log('修改成功');
    } else {
      ElMessage.error('修改失败');
    }
  })
}



</script>