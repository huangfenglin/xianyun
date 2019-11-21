<template>
  <div class="container">
    <div class="main">
      <p>发表攻略</p>
      <span>分享你的个人游记,让更多人看到哦!</span>
      <!--  :model双向绑定
            label-width设置宽 -->
      <el-form ref="form" :model="form" label-width="90px">
        <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成 -->
        <el-form-item class="title">
           <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <!-- 富文本编辑框 -->
        <el-form-item>
          <VueEditor 
           ref="vueEditor" 
           :editorToolbar="customToolbar"
           v-model="form.content" />
        </el-form-item>

        <div class="selector">
          <div class="cities">选择城市</div>
          <!-- 选择城市输入框 -->
          <el-form-item>
            <el-autocomplete
            class="inline-input"
            v-model="form.city"
            placeholder="请搜索游玩城市"
            ></el-autocomplete>
          </el-form-item>
        </div>

        <!-- 发布 -->
        <el-form-item>
          <el-button type="primary">发布</el-button>&nbsp;或者
          <a href="#">保存到草稿</a>
        </el-form-item>
      </el-form>
    </div>
    <div class="aside">
      <h4>草稿箱</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        content:"",
        title: ""
      },
      cities: [],
      customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"],["video"]]
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  position: relative;
  .main {
    width: 750px;
    p {
      font-size: 24px;
      margin-bottom: 10px;
      margin-right: 65px;
    }
    span {
      display: block;
      font-size: 12px;
      color: #999;
      margin-bottom: 20px;
    }
  }
/deep/ .el-form-item__content {
  margin: 0 !important;
  vertical-align: middle;
}
/deep/.selector {
  display: flex;
  justify-content: start;
  align-items: center;
  .cities {
    margin-right: 10px;
    margin-bottom: 22px;
    font-size: 16px !important;
    color: black !important;
  }
}

a {
  color: orange;
  font-size: 14px;
}
.aside {
  border: 1px solid #ccc;
  width: 205px;
  position: absolute;
  top: 20px;
  left: 800px;
  padding: 10px;
  h4 {
    font-weight: 400;
    color: #666;
    margin-bottom: 10px;
  }
}
}
</style>