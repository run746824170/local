<template>
    <div>
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    import comment from '../common/comment.vue'
    export default {
        name: "goodsComment",
        data(){
            return{
                id:this.$route.params.id
            }
        },
        //注册
        components:{
            comment
        }
    }
</script>

<style scoped>

</style>