<template>
  <div class="container">
    <!-- 左侧边栏组件 -->
  <leftNavigation @getCity="getCity"/>

  <!-- 右边组件 -->
  <div class="articleList">
  <articleList :cityData="cityData"/>
   
  </div>
  </div>
</template>

<script>
import leftNavigation from "@/components/post/leftnavigation"
import articleList from "@/components/post/articlelist"

export default {
components: {
  leftNavigation,
  articleList
},
data() {
  return {
    cityData:"",
  }
},
methods: {
  getCity(city) {
    this.cityData = city
  }
}
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: 0 auto;
    .articleList {
      width: 70%;
    }
  }
</style>