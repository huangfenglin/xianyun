<template>
  <div class="aside">
    <h4 class="header">相关攻略</h4>
    <div class="post_list" v-for="(item,index) in data" :key="index" @click="handleDetail(item.id)">
      <img src="@/assets/images/pic_sea.jpeg" alt="" v-if="item.images.length === 0">
            <img :src="item.images[0]" alt="" v-else>
      <div class="left">

        <p>{{item.title}}</p>

        <div class="info">
          <span class="time">{{item.created_at | format}}</span>
          <span class="reader_number">阅读 {{item.watch}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props:{
    data:{
      type:Array,
      default:[]
    }
  },
  methods: {
    handleDetail(id){
      if(this.$route.query.id == id) return;
      this.$router.push({
        path:"/post/postDetail",
        query: {id}
      })
      this.$emit("handleAside", id);
    }
  },
    filters: {
    format(val) {
      val = moment(val).format("YYYY-MM-DD hh:mm");
      return val;
    }
  }
}
</script>

<style lang="less" scoped>
  .aside {
    width: 280px;
    margin-left: 20px;
    .header {
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    .post_list {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      vertical-align: middle;
       border-bottom: 1px solid #ddd;
       img {
         width: 100px;
         height: 80px;
         display: block;
       }
       .left {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         width: 200px;
         margin-left: 10px;
         p {
           font-size: 16px;
           font-weight: 400
         }
         .info{
           span {
             color: #999;
             font-size: 12px;
           }
         }
       }
    }
  }
</style>