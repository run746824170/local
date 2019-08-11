<template>
    <div class="desc_container">
        <h4>{{desc.title}}</h4>
        <hr>
        <div class="content" v-html="desc.content"></div>
    </div>
</template>

<script>
    export default {
        name: "goodsDesc",
        data(){
            return{
                id:this.$route.params.id,
                desc:{}
            }
        },
        created(){
          this.getDesc();
        },
        methods:{
            //获取图文介绍
            getDesc(){
                this.$axios.get('/api/goods/getdesc/'+this.id)
                    .then(result=>{
                        if(result.data.status===0){
                            this.desc=result.data.message[0];
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .desc_container{
        padding: 0 5rem/@baseFontSize;
        h4{
            color: #26a2ff;
            text-align: center;
        }
    }
</style>