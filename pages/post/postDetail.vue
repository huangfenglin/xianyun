<template>
  <el-row type="flex" justify="space-between" class="container">
    <!-- 左边内容 -->
    <el-row class="main">
      <!-- 头部面包屑导航 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 标题 -->
      <el-row>
        <h1>{{item.title}}</h1>
      </el-row>
      <!-- 攻略信息时间和阅读量 -->
      <el-row type="flex" justify="end" class="post-info">
        <span class>攻略 {{creat_time}}</span>
        <span>阅读：{{item.watch}}</span>
      </el-row>
      <!-- 文章 -->
      <el-row class="post">
        <el-row class="content" v-html="item.content"></el-row>
      </el-row>

      <!-- 点赞收藏评论分享 -->
      <el-row class="btn" type="flex" justify="center">
        <el-row type="flex">
          <el-row class="Vertical">
            <i class="el-icon-edit-outline"></i>
            <span>评论({{item.comments.length}})</span>
          </el-row>
          <el-row class="Vertical">
            <i class="el-icon-star-off"></i>
            <span>收藏</span>
          </el-row>
          <el-row class="Vertical">
            <i class="el-icon-share"></i>
            <span>分享</span>
          </el-row>
          <el-row class="Vertical">
            <i class="iconfont iconding"></i>
            <span>点赞{{item.like}}</span>
          </el-row>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      item: {
        comments: []
      },
      creat_time: ""
    };
  },
  mounted() {
    this.$axios({
      url: "/posts",
      params: this.$route.query
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.item = data[0];
      this.creat_time = moment(this.item.created_at).format(`YYYY-MM-DD  hh:mm`);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .main {
    width: 700px;
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .post-info {
      padding: 20px;
      span {
        color: #999;
        margin-left: 20px;
      }
    }
    .content {
      /deep/ img {
        max-width: 700px;
        margin: 10px 0;
      }
    }
    .btn {
      padding: 30px 0;
      .Vertical {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 20px;
        i {
          font-size: 28px;
          color: orange;
        }
        span {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>