<template>
  <el-card style="padding: 10px; margin: 20px">
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
      <el-descriptions-item label="用户名">
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <User />
          </el-icon>
          {{ form.username }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="电话">
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Iphone />
          </el-icon>
          {{ form.phone }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Tickets />
          </el-icon>
          <el-tag size="small">{{ form.name }}</el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="地址">
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <OfficeBuilding />
          </el-icon>
          {{ form.address }}
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted, computed} from 'vue';
import request from '@/util/request'; // 根据实际路径调整
import { ElMessage } from 'element-plus';
import {
  User,
  Iphone,
  Tickets,
  OfficeBuilding,
} from '@element-plus/icons-vue';

const form = reactive({
  username: '',
  phone: '',
  name: '',
  address: '',
});

const user = JSON.parse(localStorage.getItem('user') || '{}');
const size = ref('default');
const iconStyle = computed(() => ({
  marginRight: '6px',
}));

onMounted(async () => {
  if (!user.data || !user.data.id) {
    ElMessage.warning('用户信息不完整，无法获取个人信息。');
    return;
  }

  try {
    const response = await request.get('/getSellerPerson', {
      params: {
        id: user.data.id,
      },
    });

    if (response.data.code === 0 && response.data.data) {
      form.username = response.data.data.username || '';
      form.phone = response.data.data.phone || '';
      form.name = response.data.data.name || '';
      form.address = response.data.data.address || '';
    } else {
      ElMessage.error(response.data.message || '获取个人信息失败');
    }
  } catch (error) {
    console.error('获取个人信息时出错:', error);
    ElMessage.error('网络错误，请稍后再试');
  }
});
</script>

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