
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
axios.defaults.baseURL='http://www.liulongbin.top:3005/';
Vue.prototype.$axios=axios;


//下载moment 时间格式化插件
//导入moment
import moment from 'moment'
Vue.filter('dateFormat',function (dataStr,partern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(partern);
});
//导入mui
import './lib/mui/css/mui.css'
//导入mui扩展图标库
import './lib/mui/css/icons-extra.css'

//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
new Vue({
    el:'#app',
    render:c=>c(App),
    router
});



