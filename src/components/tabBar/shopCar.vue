<template>
    <div class="car">
        <div class="car_container">
            <div class="mui-card" v-for="(item,index) in list" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getSelected[item.id]" @change="getSelect(item.id,$store.getters.getSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <number :count="$store.getters.getGoodsCount[item.id]" :goodsId="item.id" :isHeight="true"></number>
                                <a @click.prevent="cut(index,item.id)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="content">
                            <p>总计(不包含运费)</p>
                            <p>
                                已勾选商品<span>{{ this.$store.getters.getGoodsPrice.amount}}</span>件,总价 <span>￥{{this.$store.getters.getGoodsPrice.total}}</span>
                            </p>
                        </div>
                        <mt-button type="danger" size="small">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import number from '../common/number.vue'
    export default {
        name: "shopCar",
        data() {
            return {
                list: []
            }
        },
        components: {
            number
        },
        created() {
            this.getCarInfo();
        },
        methods: {
            //获取购物车数据
            getCarInfo() {
                let arrId = [];
                this.$store.state.car.forEach(item => {
                    arrId.push(item.id);
                });
                if(!arrId.length) return;
                this.$axios.get('/api/goods/getshopcarlist/' +arrId.join(','))
                    .then(result => {
                        if (result.data.status === 0) {
                            this.list = result.data.message;
                        }
                    })
            },
            //点击删除
            cut(index,id){
                this.list.splice(index,1);
                this.$store.commit('removeCarCount',id);
            },
            //点击开关切换状态
            getSelect(id,val){
                this.$store.commit('updateSelected',{id,selected:val});
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .car_container {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
        }
        img {
            width: 100rem/@baseFontSize;
            height: 100rem/@baseFontSize;
        }
        .info {
            h3 {
                font-size: 14rem/@baseFontSize;
            }
            p {
                display: flex;
                .price {
                    align-items: center;
                    color: red;
                    font-weight: bolder;
                    margin-right: 5rem/@baseFontSize;
                    margin-top: 10rem/@baseFontSize;
                }
                a {
                    margin-top: 10rem/@baseFontSize;
                }
            }
        }
        .content {
            span {
                color: red;
                font-weight: bolder;
            }
        }
    }


</style>