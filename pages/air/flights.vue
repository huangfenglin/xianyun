<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页组件 -->
        <!-- size-change: 切换条数时候触发的事件 -->
        <!-- current-change：页数切换时候触发的事件 -->
        <!-- current-page: 当前页数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 缓存一份总数据，这份数据一旦赋值之后不能被修改
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 保存当前的分页要渲染的数组,已经在computed里来计算生成
      // dataList: [],
      // 分页的变量
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  // 保存当前的分页要渲染的数组
  // ！！computed会监听函数引用所有实例下的属性，一旦属性发生了变化就会再次执行函数，返回新的值
  computed: {
    dataList() {
      const arr = this.flightsData.flights.slice(
        // 一下子拿到的是所有数据 所以要截取
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  // 监听路由的变化，在组件被复用使用调用这个路由守卫
  async beforeRouteUpdate(to, from, next) {
    // 获取航班列表的函数,返回promise
    await this.getList(to.query);
    // 必须要调用
    next();
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    // 切换页数时触发
    handleCurrentChange(val) {
      console.log(val);
      this.pageIndex = val;
    },
    setDataList(arr) {
      // 这里是有问题的，一旦修改了flightsData,后面的值都会只剩下过滤后
      this.flightsData.flights = arr;
      // 修改总条数
      this.total = arr.length;
      // 把页面设置为1
      this.pageIndex = 1;
    },
    // 获取航班列表的函数，query是5个参数
    getList(query) {
      // 请求机票列表数据
      return this.$axios({
        url: "/airs",
        params: query
      }).then(res => {
        // 总数据，包含了 flights， info， options，flights用来渲染航班列表
        const { data } = res;
        this.flightsData = data;
        // 赋值给拷贝的新数据, 这份数据一旦赋值之后不能被修改
        this.cacheFlightsData = { ...data };
        // 数据的总条数
        this.total = this.flightsData.total;
      });
    }
  },
  mounted() {
    this.getList(this.$route.query);
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
.aside {
  width: 240px;
}
</style> 