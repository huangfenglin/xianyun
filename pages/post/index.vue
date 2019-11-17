<template>
  <div class="container">
    <!-- 左侧边栏组件 -->
  <leftNavigation/>
  </div>
</template>

<script>
import leftNavigation from "@/components/post/leftnavigation"
export default {
components: {
  leftNavigation
}
}
</script>

<style lang="less" scoped>
  .container {
    width: 1000px;
    margin: 0 auto;
  }
</style>