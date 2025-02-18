<script setup lang="ts">
import { computed, ref ,onMounted } from 'vue'

const user = ref(null);
onMounted(() => {
  const userString = sessionStorage.getItem("user");

  if (userString) {
    user.value = JSON.parse(userString);
  }

})

import {
  Iphone,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight:  marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop:  marginMap.default,
  }
})
</script>


<template>
 <el-card style="padding: 10px;margin:20px">
   <el-descriptions
       class="margin-top"
       title="个人信息"
       :column="3"
       :size="size"
       border
   >
     <template #extra>
       <el-button type="danger">编辑</el-button>
     </template>
     <el-descriptions-item>
       <template #label >
         <div class="cell-item" >
           <el-icon :style="iconStyle">
             <user />
           </el-icon>
           用户名
         </div>
       </template>
       用户名点

     </el-descriptions-item>
     <el-descriptions-item>
       <template #label>
         <div class="cell-item">
           <el-icon :style="iconStyle">
             <iphone />
           </el-icon>
           电话
         </div>
       </template>
       电话点
     </el-descriptions-item>
     <el-descriptions-item>
       <template #label>
         <div class="cell-item">
           <el-icon :style="iconStyle">
             <tickets />
           </el-icon>
           身份
         </div>
       </template>
       <el-tag size="small">
         身份点
       </el-tag>
     </el-descriptions-item>
     <el-descriptions-item>
       <template #label>
         <div class="cell-item">
           <el-icon :style="iconStyle">
             <office-building />
           </el-icon>
           地址
         </div>
       </template>
       地址点
     </el-descriptions-item>
   </el-descriptions>
 </el-card>




</template>



<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
