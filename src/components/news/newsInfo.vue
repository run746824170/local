<template>
    <div class="info">
        <h2>{{ infoData.title }}</h2>
        <p>
            <span>发表时间:{{ infoData.add_time | dateFormat('YYYY-MM-DD')}}</span>
            <span>点击次数:{{ infoData.click }}</span>
        </p>
        <hr>
        <div v-html="infoData.content"></div>

        <!--评论部分-->
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    //导入评论组件
    import comment from '../common/comment.vue'
    export default {
        name: "newsInfo",
        components:{
            comment
        },
        data() {
            return {
                id: this.$route.params.id,
                infoData: {}
            }
        },
        created(){
            this.getNewInfo();
        },
        methods: {
            getNewInfo() {
                this.$axios.get('/api/getnew/' + this.id)
                    .then(result => {
                        if(result.data.status===0){
                            this.infoData = result.data.message[0];
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .info{
        padding: 0 5px;
        h2{
            color: red;
            font-size:18px;
            margin: 15px 0;
            text-align: center;
        }
        p{
            display: flex;
            font-size: 14px;
            justify-content: space-between;
            margin-bottom:10px;
            span{
                color: rgb(31,213,354);
            }
        }
    }
</style>