<template>
    <div class="vue-container">
        <!--header-->
        <mt-header fixed title="vue项目"></mt-header>

        <!--占位-->
        <transition>
            <router-view></router-view>
        </transition>
        <!--container-->

        <!--bottom-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopCar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">7</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app"
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

</style>