<template>
  <el-row class="content">
    <p class="title">评论</p>
    <!-- 文本域 -->
    <el-row>
      <textarea
        v-model="form.content"
        class="textarea"
        placeholder="说儿点什么吧"
        autocomplete="off"
        style="resize:none;"
        ref="textarea"
        cols="30"
        rows="6"
      ></textarea>
    </el-row>

<!--  action必选参数，上传的地址
      name上传的文件字段名
      on-preview点击文件列表中已上传的文件时的钩子
      on-remove文件列表移除文件时的钩子
      on-success文件上传成功时的钩子
      :clearFiles	清空已上传的文件列表
 -->
    <el-row class="submit" type="flex" justify="space-between" >
      <el-row class="upload">
        <el-upload
          ref="buttons"
          action="http://127.0.0.1:1337/upload"
          name="files"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
      <p class="button" @click="handlesubmit">提交</p>
    </el-row>

    <CommentFloor 
    v-for="(item,index) in commend"
    :key="index"
    :data=item
    class="commends"
    />

  </el-row>
</template>

<script>
import CommentFloor from "./commentFloor"
export default {
  components: {
    CommentFloor
  },
  data() {
    return {
      form: {
        content: "",
        pics: [],
        post:this.$route.query.id,
        follow: Number
      },
      commend: [],
    };
  },
  methods: {
    // 获取评论数据
    getComments(){
          // 获取文章评论数据
    this.$axios({
      url: "/posts/comments",
      params: {
        post: this.$route.query.id
      }
    }).then(res=>{
      const { data } = res.data;
      this.commend = data
      console.log(data);
      
    })
    },
    // 点击移出图片
    handleRemove(file, fileList) {
      console.log(file,fileList);
      const id = file.response[0].id
      let index = this.form.pics.findIndex((v,i)=>{
        id == v.id
     })
     this.form.pics.splice(index,1);
      
    },
    // 图片上传成功
    handleAvatarSuccess(res,file) {
      this.form.pics.push(res[0])
    },
    // 提交評論
    handlesubmit(){
      if(this.form.content == "" && this.form.pics.length == 0) {
        this.$message.warning("评论内容或图片不能为空,请正确填写您的评论"); return
      }
      this.$axios({
        url: "/comments",
        method: "POST",
        data: this.form,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(res);
        if(res.status ==200) {
          this.$message.success("评论成功");
          this.getComments()
        }
      })
    }
  },
  mounted() {
    this.getComments()
  }
};
</script>
<style lang="less" scoped>
  .content {
    margin-bottom: 20px;
    width: 720px;
    .title {
      color: #000;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .textarea {
      box-sizing: border-box;
      border-radius: 4px;
      width: 720px;
      min-height: 35px;
      padding: 10px;
      width: 100%;
    }
    .submit {
      margin-top: 10px;
      margin-bottom: 30px;
      .button {
        cursor: pointer;
        text-align: center;
        background: #409eff;
        color: #fff;
        font-size: 14px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        
      }
    }
    .commends {
    border: 1px solid #cccccc;
    padding: 20px;
    padding-left: 30px;
  }
  }
</style>