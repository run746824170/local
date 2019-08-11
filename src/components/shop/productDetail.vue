<template>

    <div class="pro_detail">
        <!--轮播图-->
        <swiper :getbanner="banner" :isfull="false"></swiper>
        <!--商品价格-->
        <div class="mui-card">
            <div class="mui-card-header">{{info.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        <span class="market_price">市场价格:{{ info.market_price}}</span>
                        <span>销售价: <span class="price">{{ info.sell_price }}</span></span>
                    </p>
                    <p>购买数量</p>
                    <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="cut">-</button>
                        <input class="mui-input-numbox" type="number" v-model="num">
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
                    </div>
                    <div>
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{ info.goods_no}}</p>
                    <p>库存情况:{{ info.stock_quantity}}</p>
                    <p>上架时间:{{ info.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button  type="primary" size="large" plain @click="goDesc(info.id)">图文介绍</mt-button>
                <mt-button  type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swiper from '../common/swiper.vue'

    export default {
        name: "productDetail",
        data() {
            return {
                id: this.$route.params.id,
                num: 1,
                info: {},
                stock: null,
                banner: []
            }
        },
        created() {
            this.getInfo();
            this.getBanner();
        },
        methods: {
            //获取轮播图数据
            getBanner() {
                this.$axios.get('/api/getthumimages/' + this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            result.data.message.forEach(item => {
                                item.img = item.src;
                            });
                            this.banner = result.data.message;
                        }
                    })
            },
            //获取商品参数
            getInfo() {
                this.$axios.get('/api/goods/getinfo/' + this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.info = result.data.message[0];
                            this.stock = this.info.stock_quantity;
                        }
                    })
            },
            //点击数量增加
            add(num, stock) {
                this.num++;
                if (this.num >= this.stock) {
                    Toast({
                        message: '库存不足',
                        position: 'middle',
                        duration: 2000
                    });
                    this.num = this.stock;
                }
            },
            //点击数量减少
            cut(num) {
                this.num--;
                if (this.num <= 1) {
                    Toast({
                        message: '商品数量必须大于1',
                        position: 'middle',
                        duration: 2000
                    });
                    this.num = 1;
                }
            },
            //点击跳转到图文介绍页面
            goDesc(id){
                this.$router.push({name:'goodsDesc',params:{id}})
            }
        },
        components: {
            swiper
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .pro_detail {
        background-color: #f5f5f5;
        .mui-card {
            .mui-card-header{
                font-size: 17rem/@baseFontSize;
                border-radius: 2rem/@baseFontSize 2rem/@baseFontSize 0 0;
            }
            .mui-card-content-inner {
                 p{
                     font-size: 14rem/@baseFontSize ;
                     margin-top: 0;
                     margin-bottom: 10rem/@baseFontSize ;
                     color: #8f8f94;
                    span{
                        font-weight: normal;
                        &.market_price{
                            text-decoration: line-through;
                            margin-right: 10rem/@baseFontSize;
                        }
                        &.price{
                            color: red;
                            font-weight: bolder;
                        }
                    }
                }
                .mui-numbox{
                    margin-bottom: 10rem/@baseFontSize;
                }
            }
            .mui-card-footer{
                display: block;
                button{
                    margin-bottom: 10rem/@baseFontSize;
                }
            }
        }
    }
</style>