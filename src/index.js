//导入项目框架
import Vue from 'Vue'
import App from './app.vue'
import './app.less'

//导入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

//导入路由
import VueRouter from 'vue-router'
import router from './router.js'

Vue.use(VueRouter);

//导入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';
Vue.prototype.$axios = axios;


//下载moment 时间格式化插件
//导入moment
import moment from 'moment'

Vue.filter('dateFormat', function (dataStr, partern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(partern);
});
//导入mui
import './lib/mui/css/mui.css'
//导入mui扩展图标库
import './lib/mui/css/icons-extra.css'

//导入图片预览插件
import VuePreview from 'vue-preview'

Vue.use(VuePreview);

//导入vuex
import Vuex from 'vuex'

Vue.use(Vuex);
let car = JSON.parse(localStorage.getItem('car') || "[]");
const store = new Vuex.Store({
    state: {//this.$store.state.***
        car: car  //{id:商品的id,price:商品的价格,count:商品的数量,selected:false}
    },
    mutations: {//this.$store.commit('方法的名称','唯一的参数')
        //添加到购物车
        //1.如果购物车中有相同的商品，只需要更新数量就可以了
        //2.如果购物车没有相同的商品，则需要把新的商品信息push到state car当中
        addToCar(state, goodsInfo) {
            //默认没有找到
            let flag = true;
            state.car.forEach(item => {
                if (item.id === goodsInfo.id) {
                    item.count += parseInt(goodsInfo.count);
                    //当找到的时候
                    flag = false;
                    return true;
                }
            });
            //如果没有找到
            if (flag) {
                state.car.push(goodsInfo);
            }
            //把数据添加到本地缓存中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //4.点击删除
        removeCarCount(state, id) {
            state.car.forEach((item, index) => {
                if (item.id == id) {
                    state.car.splice(index, 1);
                }
            });
            //更新本地缓存
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        //点击按钮更新购物车商品的数量
        updateGoodsInfo(state,goodsInfo){
            state.car.forEach(item=>{
                if(item.id==goodsInfo.id){
                    item.count=parseInt(goodsInfo.count);
                    return true;
                }
            });
            //更新本地缓存中商品的商量
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //更新开关的状态值
        updateSelected(state, info) {
            state.car.forEach(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                }
            });
            //更新本地缓存中的数据
            localStorage.setItem('car', JSON.stringify(state.car))
        },
    },
    getters: {//this.$store.getters.***
        //5.获取徽标的数量
        getAllCount(state) {
            let num = 0;
            state.car.forEach(item => {
                num += item.count;
            });
            return num;
        },
        //2.获取开关的状态
        getSelected(state) {
            let selected = {};
            state.car.forEach(item => {
                selected[item.id] = item.selected;
            });
            return selected;
        },
        //3.获取购物车商品的数量
        getGoodsCount(state) {
            let num = {};
            state.car.forEach(item => {
                num[item.id] = item.count;
            });
            return num;
        },
        //获取购物车商品的总价和数量
        getGoodsPrice(state) {
            let num = {
                total: 0,
                amount: 0
            };
            state.car.forEach(item => {
                //如果选中的状态
               if(item.selected){
                   num.total += parseInt(item.count * item.price);
                   num.amount += item.count;
                   console.log(num.total,num.amount )
               }
            });
            return num;
        }
    }
});


//路由导航钩子函数
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
new Vue({
    el: '#app',
    render: c => c(App),
    router,
    store
});



