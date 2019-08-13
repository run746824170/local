<template>
    <div class="pro_detail">
            <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
                <div @transitionend="end" class="ball" v-show="flag"></div>
            </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--轮播图-->
                    <swiper :getbanner="banner" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品价格-->
        <div class="mui-card">
            <div class="mui-card-header">{{info.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        <span class="market_price">市场价格:{{ info.market_price}}</span>
                        <span>销售价: <span class="price">{{ info.sell_price }}</span></span>
                    </p>
                    <p>
                        购买数量
                        <number :maxNum="info.stock_quantity" @getCount="getSelectedCount" :count="selectedCounted" :isHeight="false"></number>
                    </p>
                    <div>
                        <mt-button type="primary" @click="goCart(info.id)">立即购买</mt-button>
                        <mt-button type="danger" @click="goShopCar">加入购物车</mt-button>
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
                <mt-button type="primary" size="large" plain @click="goDesc(info.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(info.id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swiper from '../common/swiper.vue'
    import number from '../common/number.vue'
    export default {
        name: "productDetail",
        data() {
            return {
                id: this.$route.params.id,
                //默认数量为1
                selectedCounted: 1,
                info: {},
                banner: [],
                flag: false,
                isShow:true,
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
                            result.data.message.forEach(item =>{
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
                        }
                    })
            },
            //跳转到购物车页面
            goCart(id){
               this.$router.push({name:'shopCart',params:{id}});
            },
            //商品详情页面
            goDesc(id) {
                this.$router.push({name: 'goodsDesc', params: {id}})
            },
            //点击跳转到商品评论页面
            goComment(id) {
                this.$router.push({name: 'goodsComment', params: {id}})
            },
            getSelectedCount(num) {
                this.selectedCounted=num;
            },
            //动画入场前
            beforeEnter(el){
                if(!this.isShow){
                    el.style.transform="translate(0,0)"
                }

            },
            //正在入场
            enter(el,done){
                if(!this.isShow){
                    el.offsetWidth;
                    let ball=document.querySelector('.ball').getBoundingClientRect();
                    //拿到当前页面任何的dom元素和所在的组件没有任何关系
                    let badge=document.querySelector('.mui-badge').getBoundingClientRect();
                    let x=badge.left-ball.left;
                    let y=badge.top-ball.top;
                    el.style.transition="all 0.8s cubic-bezier(0.4, -0.3, 1, 0.6)";
                    el.style.transform=`translate(${x}px,${y}px)`;
                    done()
                }
            },
            //入场之后
            afterEnter(){
                this.flag=!this.flag;
            },
            end(){
                this.isShow=true;
            },
            //点击购物车
            goShopCar(){
                if(this.isShow){
                    this.isShow=false;
                    this.flag=!this.flag;
                    let goodsInfo={id:this.id,count:this.selectedCounted,price:this.info.sell_price,selected:true};
                    //调用store中的mutations
                    this.$store.commit('addToCar',goodsInfo);
                }
            }
        },
        components: {
            swiper,
            number
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";

    .pro_detail {
        background-color: #f5f5f5;
        position: relative;
        overflow: hidden;
        .mui-card {
            .mui-card-header {
                font-size: 17rem/@baseFontSize;
                border-radius: 2rem/@baseFontSize 2rem/@baseFontSize 0 0;
            }
            .mui-card-content-inner {
                p {
                    font-size: 14rem/@baseFontSize;
                    margin-top: 0;
                    margin-bottom: 10rem/@baseFontSize;
                    color: #8f8f94;
                    span {
                        font-weight: normal;
                        &.market_price {
                            text-decoration: line-through;
                            margin-right: 10rem/@baseFontSize;
                        }
                        &.price {
                            color: red;
                            font-weight: bolder;
                        }
                    }
                }


            }
            .mui-card-footer {
                display: block;
                button {
                    margin-bottom: 10rem/@baseFontSize;
                }
            }
        }
        .ball {
            width: 30rem/@baseFontSize;
            height: 30rem/@baseFontSize;
            border-radius: 50%;
            background-color: red;
            top:560rem/@baseFontSize;
            left:350rem/@baseFontSize;
            position: absolute;
            z-index: 1000;
        }
    }
</style>