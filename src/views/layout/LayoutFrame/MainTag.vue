<template>
  <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      class="mx-1"
      closable
      @close="handleClose(tag)"
      @click="handleTagClick(tag)"
  >
    {{ tag }}
  </el-tag>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();


function getRouteByTag(tag: string): string {
  // 这里定义标签到路由的映射关系
  const tagRoutes = {
    '个人信息': '/person',
    '修改密码': '/changePassword',
    '买家个人信息': '/BuyerPerson',
    '卖家个人信息': '/SellerPerson',
    '购物车管理': '/shopCart',
  };
  return tagRoutes[tag] || '/layout'; // 默认路由
}

const handleTagClick = (tag: string) => {
  const route = getRouteByTag(tag);
  router.push(route); // 跳转到对应的页面
};


const tags = computed(() => {
  return store.state.tags;
});

const handleClose = (tag: string) => {
  store.commit('removeTag', tag);
  router.push('/layout');
};





</script>

<style scoped>
/* 添加一些样式（可选） */
.mx-1 {
  margin-left: 8px;
}
</style>