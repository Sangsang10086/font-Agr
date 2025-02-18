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
    '店铺信息管理': '/store',
    '农产品管理': '/sellerPro',
    '农产品销售情况': '/viewselled',
    '个人信息': '/person',
    '修改密码': '/changePassword',
  };
  return tagRoutes[tag] || '/sellerTop'; // 默认路由
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
  router.push('/sellerTop');
  // window.location.href = '/sellerTop';
};





</script>

<style scoped>
/* 添加一些样式（可选） */
.mx-1 {
  margin-left: 8px;
}
</style>