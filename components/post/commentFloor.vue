<template>
  <el-row class="container">

    <el-row class="user" type="flex" justify="space-between">
      <el-row class="user_Info" type="flex">
        <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
        <span>{{data.account.nickname}}</span>
        <i>{{data.account.created_at|format}}</i>
      </el-row>
      <em>{{data.level}}</em>
    </el-row>
      <Item :data="data.parent" v-if="data.parent" class="item" />
    <el-row class="content">
      <p>{{data.content}}</p>
      <el-row type="flex" justify="start">
        <el-row
          class="content_img"
          v-for="(item,index) in data.pics"
          :key="index"
          v-show="data.pics"
        >
          <img :src="$axios.defaults.baseURL+item.url" alt />
        </el-row>
      </el-row>
      <span class="reply">回复</span>
    </el-row>
  </el-row>
</template>

<script>
import moment from "moment";
export default {
  name: "Item",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  filters: {
    format(val) {
      val = moment(val).format("YY-MM-DD hh:mm");
      return val;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  padding: 10px 3px;
  background: #fff;
  .user {
    margin-bottom: 10px;
    margin-top: 5px;
    font-size: 13px;
    .user_info {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    img {
      width: 17px;
      height: 17px;
      padding-left: 10px;
      margin: 0 !important;
    }
    span {
      color: #666;
      padding: 0 10px;
    }
    i {
      color: #999;
    }
  }
  .content {
    padding-left: 20px;
    position: relative;
    width: 100%;
    p {
      margin-bottom: 10px;
    }
    .content_img {
      box-sizing: border-box;
      position: relative;
      padding: 5px;
      margin: 0 5px;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -10px;
        left: 0;
      }
    }
    .reply {
      position: absolute;
      display: none;
      right: 0;
      bottom: 0;
      font-size: 14px;
    }
      .content:hover .reply {
      display: block;
      color: #4093ff;
      cursor: pointer;
    }
  }
  .item {
    background-color: #f9f9f9;
    border: 1px solid #ddd !important;
  }
}
</style>