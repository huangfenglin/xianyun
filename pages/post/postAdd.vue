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

        <!-- fetch-suggestions: 类似于input方法，每次输入框值发生变化时候回触发 -->
        <!-- select：选中下拉列表中的值的时候触发的触发  -->
        <div class="selector">
          <div class="cities">选择城市</div>
          <!-- 选择城市输入框 -->
          <el-form-item>
            <el-autocomplete
            class="inline-input"
            v-model="form.city"
            placeholder="请搜索游玩城市"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
            @blur="handleBlur"
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
      // 存放城市列表的数据
      cities: [],
      customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"],["video"]]
    }
  },
  methods: {
    querySearch (value,cb) {
      if(!value){
        return cb([]);
      }
      this.$axios({
        url: "/airs/city?",
        params:{ 
           name:value
        }
      }).then(res => {
        const { data } = res.data
       this.Cities = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        console.log(this.Cities);
        
        cb(this.Cities);
      })
    },
    handleSelect(item){
      this.form.city = item.value
      console.log(this.form);
      
    },
        // 输入框失去焦点时
    handleBlur() {
      if(this.Cities.length > 0){
        this.form.city = this.Cities[0].value
      }
      
    },
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