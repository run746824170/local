<template>
    <div class="detail">
        <h3>{{ detail.title}}</h3>
        <p>
            <span>发表时间:{{ detail.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击次数:{{ detail.click }}</span>
        </p>
        <hr>
        <div class="thumb">
            <template>
                <vue-preview :slides="imgList" @close="handleClose"></vue-preview>
            </template>
        </div>
        <p v-html="detail.content"></p>

        <!--品论部分-->
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    //导入评论组件
    import comment from '../common/comment.vue'
    export default {
        name: "photoDetail",
        components:{
            comment
        },
        data(){
            return{
                id:this.$route.params.id,
                detail:{},
                imgList:[],

            }
        },
        created(){
            this.getPhotoDetail();
            this.getImg()
        },
        methods:{
            //获取图片详情
            getPhotoDetail(){
                this.$axios.get('/api/getimageInfo/'+this.id)
                    .then(result=>{
                        if(result.data.status===0){
                            this.detail=result.data.message[0];
                        }
                    })
            },
            //获取图片缩略图
            getImg(){
                this.$axios.get('/api/getthumimages/'+this.id)
                    .then(result=>{
                        if(result.data.status===0){
                            result.data.message.forEach(item=>{
                                item.msrc=item.src;
                                item.w=600;
                                item.h=400;
                            });
                            this.imgList=result.data.message;
                            console.log(this.imgList);
                        }
                    })
            },
            handleClose () {
                console.log('close event')
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .detail{
        padding: 0 5rem/@baseFontSize;

        h3{
            color:lightskyblue;
            font-size:18rem/@baseFontSize;
            margin: 15rem/@baseFontSize 0;
            text-align: center;
        }
        p{
            display: flex;
            font-size:16rem/@baseFontSize;
            justify-content: space-between;
            margin-bottom:10rem/@baseFontSize;
            color: #000;
            text-align: left;
            span{
                color:#666;
                font-size: 14rem/@baseFontSize;
            }
        }
    }
</style>