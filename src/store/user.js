// src/stores/user.js
import { defineStore } from 'pinia';
import request from "@/util/request.js";
import {ref} from "vue";
import {ElMessage} from "element-plus";

export const useUserStore = defineStore('user', {
    state: () => ({
        formData: JSON.parse(localStorage.getItem('user')) || {
            id: '',
            username: '',
            name: '',
            gender: '',
            phone: '',
            address: '',
        },
    }),
    actions: {
        setFormData(data) {
            this.formData = data;
        },
        async fetchUserData() {
            const user = localStorage.getItem('user');
            try {
                await request.get('/fontBuyerPerson/getDate', user.data.id).then(res => {
                    this.formData = res.data;
                    localStorage.setItem('user', JSON.stringify(res.data));
                })
            } catch (error) {
                console.error('获取用户数据失败:', error);
            }
        },
    },
});
export const useShopStore = defineStore('shop', {
    state: () => ({
        formData: [], // 将 formData 定义为 FormDataItem 类型的数组
    }),
    actions: {
        setFormData(data) {
            this.formData.push(data);
        },
        rmFormData(id) {
            this.formData = this.formData.filter(item => item.id !== id);
        },
        submitForm(formData,buyerId) {                                                            //支付功能相结合，先不实现
            request.post('/SumMain', {
                reqSumCart:formData,
                buyerId:buyerId
            }).then(res => {
                if (res.data && res.data.code === 0){
                    ElMessage.success('结算跳转...');
                }
            })
        },

    }
});
export const useTopStore = defineStore('detail', {
    state: () => ({
        formData:[{
            id: '',
            image: '',
            text: '',
            price: '',
            num: '',
            storeName:''
        }]
    }),
    actions: {
        setFormData(data) {
            this.formData.id=data.id;
            this.formData.image=data.image;
            this.formData.text=data.text;
            this.formData.price=data.price;
            this.formData.num=data.num;
            this.formData.storeName=data.storeName;
        }
    }
});