<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='maxNum' :class="{height:isHeight}">
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" :value="count" type="number"  @change="countChange" ref="num"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button" >+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "number",
        mounted(){
            mui('.mui-numbox').numbox()
        },
        methods:{
            countChange(num){
                //给当前元素绑定ref属性，可以通过this.$refs.属性值拿到dom对象
                this.$emit('getCount',parseInt(this.$refs.num.value));
                this.$store.commit('updateGoodsInfo',{id:this.goodsId,count:parseInt(this.$refs.num.value)})
            }
        },

        watch:{
            maxNum:function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        },
        props:['maxNum','count','goodsId','isHeight']
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .height{
        height: 60rem/@baseFontSize;
    }
</style>