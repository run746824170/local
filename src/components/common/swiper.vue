<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in getbanner" :key="item.id">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                isFull:true
            }
        },
        props: ['getbanner','isfull']
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .mint-swipe {
        height: 280rem/@baseFontSize;
        text-align: center;
        margin-bottom: 20rem/@baseFontSize;
        img {
            height:100%;
        }
    }
    .full{
       width: 100%;
    }
</style>