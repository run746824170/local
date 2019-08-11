<template>
    <div class="com_container">
        <router-link tag="div" class="box" v-for="(item,index) in commodityList" :key="item.id"
                     :to="'/home/productDetail/'+item.id">
            <img :src="item.img_url" alt="">
            <p class="title">{{item.title}}</p>
            <p class="title">{{item.zhaiyao}}</p>
            <div class="bottom">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="oldPrice">￥{{item.market_price}}</span>
                </p>
                <p class="hot">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="more">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "shopping",
        data() {
            return {
                index: 1,
                commodityList: []
            }
        },
        created() {
            this.getCommodityList();
        },
        methods: {
            getCommodityList() {
                this.$axios.get('/api/getgoods/' + "?pageindex=" + this.index)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.commodityList = this.commodityList.concat(result.data.message);
                        }
                    })
            },
            //点击加载更多
            more() {
                this.index++;
                this.getCommodityList();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .com_container {
        display: flex;
        flex-wrap: wrap;
        padding: 7rem/@baseFontSize;
        justify-content: space-between;
        .box {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8rem/@baseFontSize #ccc;
            margin-bottom: 10rem/@baseFontSize;
            overflow: hidden;
            padding:2rem/@baseFontSize;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            img {
                width: 100%;
                display: block;
                min-height: 293rem/@baseFontSize;
            }
            .title {
                font-size: 14rem/@baseFontSize;
                font-weight: bolder;
                color: #000;
                margin-left: 5rem/@baseFontSize;
            }

            .bottom {
                background-color: #EEEEEE;
                p{
                    font-size: 14rem/@baseFontSize;
                    margin-bottom: 0;
                    padding: 5rem/@baseFontSize;
                    &.price{
                        span{
                            margin-right: 5rem/@baseFontSize;
                            &.now{
                                color: red;
                                font-weight: bolder;
                                font-size: 16rem/@baseFontSize;
                            }
                            &.oldPrice{
                                text-decoration: line-through;
                            }
                        }
                    }
                    &.hot{
                        display: flex;
                        justify-content: space-between;
                    }

                }
            }
        }
    }

</style>