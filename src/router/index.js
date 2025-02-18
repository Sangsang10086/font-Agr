//导入vue-router
import { createRouter, createWebHistory } from 'vue-router';
//导入组件
import Layout from "@/views/layout/BackLayout.vue";
import TopLayout from '@/views/font/TopLayout.vue';
import BuyerLogin from "@/views/login/BuyerLogin.vue";
import BuyerPersonLayout from "@/views/font/LayoutFrame/BuyerPersonLayout.vue";
import CartLayout from "@/views/shopcart/CartLayout.vue";

//定义路由关系
const routes = [
    // =======================================================================================================================首页
    // =====================================================================================================================渲染首页页面框架
    {
        path:'/',
        component: TopLayout,
        children: [
            {
                path: '',//main子首页
                component: () => import('@/views/font/LayoutFrame/Main.vue')
            },
            {
                path:'/BuyerPersonLayout',//买家个人信息页面
                component: BuyerPersonLayout,
                children:[
                    {
                        path:'',//买家个人信息页面
                        component: () => import('@/views/font/LayoutFrame/BuyerPerson/BuyerPerson.vue')
                    },
                    {
                        path: '/EditBuyerPerson',
                        component: () => import('@/views/font/LayoutFrame/BuyerPerson/EditBuyerPerson.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',//买家登录页面
        component: BuyerLogin
    },
    {
        path:'/buyer/register',//买家注册页面
        component: () => import('@/views/login/BuyerRegister.vue')
    },
    // =============================================================================================================卖家页面
    {
        path:'/sellerTop',
        component: () => import('@/views/backSeller/SellerLayout.vue'),
        children: [
            {
                path:'',
                component: () => import('@/views/backSeller/layoutChild/main.vue')
            },
            {
                path:'/person',
                component: () => import('@/views/backSeller/layoutChild/Person.vue')
            },
            {
                path:'/changePassword',
                component: () => import('@/views/backSeller/layoutChild/ChangePassword.vue')
            },
            {
                path:'/store',
                component:()=> import('@/views/backSeller/layoutChild/Store.vue')
            },
            {
                path:'/sellerPro',
                component:()=> import('@/views/backSeller/layoutChild/SellerPro.vue')
            },
            {
                path:'/viewSelled',
                component:()=> import('@/views/backSeller/layoutChild/ViewSelled.vue')
            }
        ]

    },
    {
        path:'/regSeller',//注册卖家页面
        component: () => import('@/views/registerSeller/RegSeller.vue')
    },
    // =======================================================================================================================购物车页面
    {
        path:'/cart',
        component: CartLayout,
        children: [
            {
                path:'',
                component: () => import('@/views/shopcart/CartLayoutFrame/MainCart.vue')
            }
        ]
    },


    // =======================================================================================================================manager后端页面
    {
        path:'/layout',//后端首页
        component: Layout,
        children:[
            {
                path:'',
                component: () => import('@/views/layout/layoutChild/main.vue')
            },
            {
                path:'/managerPerson',
                component: () => import('@/views/layout/layoutChild/Person.vue')
            },
            {
                path:'/managerChangePassword',
                component: () => import('@/views/layout/layoutChild/ChangePassword.vue')
            },
            {
                path:'/BuyerPerson',
                component: () => import('@/views/layout/layoutChild/buyerModo/BuyerPerson.vue')
            },
            {
                path:'/SellerPerson',
                component: () => import('@/views/layout/layoutChild/sellerModo/SellerPerson.vue')
            },
            {
                path:'/shopCart',
                component: () => import('@/views/layout/layoutChild/buyerModo/ShopCart.vue')
            },
            {
                path:'/managerViewseller',
                component: () => import('@/views/layout/layoutChild/sellerModo/viewSelled.vue')
            },
            {
                path:'/managerStore',
                component: () => import('@/views/layout/layoutChild/sellerModo/store.vue')
            },
            {
                path:'/managerSellerPro',
                component: () => import('@/views/layout/layoutChild/sellerModo/sellerPro.vue')
            },
            {
                path:'/order',
                component: () => import('@/views/layout/layoutChild/buyerModo/order.vue')
            },
            {
                path:'/manager',
                component: () => import('@/views/layout/layoutChild/managerModo/managerPerson.vue')
            }
        ]
    },
    // =======================================================================================================================商品详情页面
    {
        path: '/detailLayout',
        component: () => import('@/views/detailshopping/DetailLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/detailshopping/DetailLayoutFrame/DetailMain.vue')
            }
        ]
    },
    {
        path:'/OrderLayout',
        component: () => import('@/views/order/OrderLayout.vue'),
        children:[
            {
                path:'',
                component: () => import('@/views/order/orderFrame/main.vue')
            }
        ]

    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router