import VueRouter from 'vue-router'

//导入对应的路由组件
import Home from './components/tabBar/home.vue'
import Member from './components/tabBar/member.vue'
import Shopcar from './components/tabBar/shopCar.vue'
import Search from './components/tabBar/search.vue'
import newsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import Picture from './components/picture/pictures.vue'


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
        {path: '/home/pictures', component: Picture}
    ],
    linkActiveClass:'mui-active'

});
export default router