<template>
    <div class="cmt_container">
        <h4>发表评论</h4>
        <hr>
        <textarea name="" id="" cols="30" rows="5" placeholder="请输入BB内容,最多BB120个字" v-model="val">

        </textarea>
        <mt-button type="primary" size="large" @click="publishDate">发表评论</mt-button>
        <div class="cmt_list">
            <div class="cmy_item" v-for="(item,index) in comments" :key="item.id">
                <div class="cmt_title">
                    <p><span>第{{index+1}}楼</span> 用户:<span>{{item.user_name}}</span> <span>发表时间:{{item.add_time | dateFormat('YYYY-MM-DD') }}</span><br>
                        <span>{{item.add_time | dateFormat('HH:mm:ss')}}</span>
                    </p>

                </div>
                <div class="cmt_body">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" class="more" @click="getMore" plain >加载更多</mt-button>
    </div>

</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "comment",
        data() {
            return {
                comments: [],
                val: '',
                pageindex: 1
            }
        },
        props: ['cmtid'],
        created() {
            this.getComment();
        },
        methods: {
            getComment() {
                this.$axios.get('/api/getcomments/' + this.cmtid + "?pageindex="+this.pageindex)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.comments =this.comments.concat(result.data.message);
                        }
                    })
            },
            //点击发表评论
            publishDate() {
                this.$axios.post('/api/postcomment/' + this.cmtid, {content: this.val})
                    .then(result => {
                        if (!this.val.length){
                            Toast({
                                message:"评论内容不能为空",
                                position:'middle',
                                duration:2000

                            });
                            return false;
                        }
                        this.getComment();
                        this.val='';
                    })
            },
            //点击加载更多
            getMore() {
                this.pageindex++;
                this.getComment();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .cmt_container {
        h4{
            font-size: 18rem/@baseFontSize;
        }
        .cmt_list {
            margin-top: 10rem/@baseFontSize;
            .cmt_title {
                height: 50px;
                background-color: #cccccc;
                border-radius: 4rem/@baseFontSize;
                p {
                    color: #000;
                    margin-top: 20rem/@baseFontSize;
                    font-size: 14rem/@baseFontSize;
                }
            }
            .cmt_body{
                font-size: 15rem/@baseFontSize;
            }
        }
        .more {
            color: red;
        }
    }

</style>