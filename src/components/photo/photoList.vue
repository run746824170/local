<template>
    <div>
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a  :class='[ "mui-control-item",item.id==0?"mui-active":""]' @click="getPhotoList(item.id)" href="#item1mobile" v-for="(item,index) in list" :key="item.id ">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link tag="li" :to="'/home/photoDetail/'+item.id" v-for="item in photoList" :key="item.id" >
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import {Lazyload} from 'mint-ui';
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        name: "pictures",
        data() {
            return {
                list: [],
                photoList: []
            }
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({})
        },
        created() {
            this.getAllList();
            this.getPhotoList();
        },
        methods: {
            getAllList() {
                this.$axios.get('/api/getimgcategory')
                    .then(result => {
                        if (result.data.status === 0) {
                            result.data.message.unshift({title: '全部', id: 0});
                            this.list = result.data.message;
                        }
                    })
            },
            getPhotoList(cateId) {
                this.$axios.get('/api/getimages/' + cateId)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.photoList = result.data.message;
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../app.less";
    .photo-list {
        list-style: none;
        margin: 0;
        padding:10rem/@baseFontSize;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10rem/@baseFontSize;
            box-shadow: 0 0 9rem/@baseFontSize #999;
            position: relative;
            //懒加载的样式
            img[lazy=loading] {
                width: 40rem/@baseFontSize;
                height:300rem/@baseFontSize;
                margin: auto;
            }
            img {
                width: 100%;
                display: block;
                height:520rem/@baseFontSize;
            }
            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);

                padding:0 5rem/@baseFontSize;
                .info-title {
                    font-size: 14rem/@baseFontSize;
                }
                .info-body {
                    font-size: 13rem/@baseFontSize;
                }
            }
        }
    }
    .mui-slider {
        position: fixed;
        z-index: 1111;
        overflow: hidden;
        width: 100%;
        background-color: #fff;
    }

</style>