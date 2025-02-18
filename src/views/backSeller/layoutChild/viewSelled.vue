<template>
  <el-card style="padding: 10px;margin: 20px">
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </el-card>



</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import request from "@/util/request.js";
import {ElMessage} from "element-plus";

// 定义响应式数据
const chartData = ref([]);

const user = JSON.parse(localStorage.getItem("user"))

// 引用 DOM 元素
const chartRef = ref(null);

// ECharts 实例
let chartInstance = null;

// 初始化图表
onMounted(() => {


  request.get('/getviewSelled',{
    params:{
      id:user.data.id,
    }
  }).then(res =>{
    if(res.data && res.data.code === 0){
      chartData.value = res.data.data;
    }else {
      ElMessage.error('获取数据失败');
    }
  })

  if (!chartRef.value) return;

  // 初始化 ECharts 实例
  chartInstance = echarts.init(chartRef.value);

  // 配置项和数据
  const option = {
    title: {
      text: '水果销量柱状图',
      left: 'center',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: chartData.value.map(item => item.name),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        interval: 0, // 显示所有标签
      },
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: chartData.value.map(item => item.value),
        itemStyle: {
          color: '#73C0DE',
        },
      },
    ],
  };

  // 设置配置项
  chartInstance.setOption(option);
});

// 监听数据变化并更新图表
watch(chartData, (newData) => {
  if (chartInstance) {
    chartInstance.setOption({
      xAxis: {
        data: newData.map(item => item.name),
      },
      series: [
        {
          data: newData.map(item => item.value),
        },
      ],
    });
  }
}, { deep: true });

// 销毁图表实例
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>