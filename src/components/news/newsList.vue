<template>
    <div class="news_container">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h2>{{item.title}}</h2>
                        <p>
                            <span>发表时间:{{ item.add_time | dateFormat('YYYY-MM-DD')}}</span>
                            <span>点击次数:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "newsList",
        data(){
            return{
              list:[]
            }
        },
        created(){
            this.getNewList();
        },
        methods:{
            getNewList(){
                this.$axios.get('api/getnewslist')
                    .then(result=>{
                       if(result.data.status==0){
                           // console.log(result);
                           this.list=result.data.message;
                       }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .news_container{
        h2{
            font-size:14px;
            color: #000;
        }
        p{
            display: flex;
            justify-content: space-between;
            span{
                font-size: 12px;
                color: rgb(31,213,354);
            }
        }
    }
</style>