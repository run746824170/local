<template>
    <div class="vue-container">
        <!--header-->
        <mt-header fixed title="vue项目">
            <span slot="left" v-show="flag" @click="goBack">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <!--占位-->
        <transition>
            <router-view></router-view>
        </transition>
        <!--container-->
        <!--bottom-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="my-mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/shopCar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return{
                flag:false
            }
        },
        created(){
            this.flag=this.$route.path==='/home'?false:true;
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        },
        watch:{
            '$route.path':function (newVal) {
                this.flag=newVal==='/home'?false:true
            }
        }
    }
</script>

<style scoped>
    .vue-container{
        padding-top: 40px;
        overflow-x: hidden;
        padding-bottom: 51px;
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition:all 1s;
    }

    .mui-bar-tab .my-mui-tab-item
    {
        display: table-cell;
        overflow: hidden;

        width: 1%;
        height: 50px;

        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;

        color: #929292;
    }
    .mui-bar-tab .my-mui-tab-item.mui-active
    {
        color: #007aff;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon
    {
        top: 3px;

        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon ~ .mui-tab-label
    {
        font-size: 11px;

        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon:active
    {
        background: none;
    }
</style>