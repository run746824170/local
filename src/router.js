import VueRouter from 'vue-router'

//导入对应的路由组件
import Home from './components/tabBar/home.vue'
import Member from './components/tabBar/member.vue'
import Shopcar from './components/tabBar/shopCar.vue'
import Search from './components/tabBar/search.vue'
import newsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotoList from './components/photo/PhotoList.vue'
import PhotoDetail from './components/photo/photoDetail.vue'
import Shop from './components/shop/shopping.vue'
import Product from './components/shop/productDetail.vue'
import GoodsDesc from './components/shop/goodsDesc.vue'



//创建路由对象
let router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Home},
        {path: '/member', component: Member},
        {path: '/shopCar', component: Shopcar},
        {path: '/search', component: Search},
        {path: '/home/newsList', component: newsList},
        {path: '/home/newsInfo/:id', component: NewsInfo},
        {path: '/home/photoList', component: PhotoList},
        {path: '/home/photoDetail/:id', component: PhotoDetail},
        {path: '/home/shopping', component: Shop},
        {path: '/home/productDetail/:id', component: Product},
        {path: '/home/goodsDesc/:id', component: GoodsDesc,name:'goodsDesc'}
    ],
    linkActiveClass:'mui-active'

});
export default router