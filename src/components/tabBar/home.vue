<template>
    <div>
        <!--轮播图-->
        <swiper :getbanner="banner" :isfull="true"></swiper>
        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoList">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/shopping">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import swiper from '../common/swiper.vue'
    export default {
        name: "home",
        data() {
            return {
                banner: []
            }
        },
        created() {
            this.getBanner();
        },
        methods: {
            getBanner() {
                this.$axios.get('api/getlunbo')
                    .then(result => {
                        if (result.data.status == 0) {
                            this.banner = result.data.message;
                        }
                    })
            }
        },
        components:{
            swiper
        }
    }
</script>
<style scoped lang="less">
    @import "../../app.less";
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
            img{
                width:100rem/@baseFontSize;
                height:100rem/@baseFontSize;
            }
            .mui-media-body{
                font-size:20rem/@baseFontSize;
            }
        }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }


</style>