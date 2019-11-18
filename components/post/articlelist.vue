<template>
  <div class="box">
    <!-- 头部搜索 -->
    <div class="search">
      <input type="text" placeholder="请输入想去的地方,  比如:  '广州'" class="input" />
      <i class="el-icon-search"></i>
    </div>
    <!-- 推荐城市 -->
    <div class="SuggestedCity">
      <em>推荐:</em>
      <span class="cities">广州</span>
      <span class="cities">上海</span>
      <span class="cities">北京</span>
    </div>
    <!-- 推荐攻略 -->
    <div class="strategy">
      <h3 class="title">推荐攻略</h3>
      <span class="write">
        <i class="el-icon-edit"></i>
        写游记
      </span>
    </div>

    <!-- 三张图片的布局 -->
    <div
      class="articleDetails"
      v-for="(item,index) in articleData"
      :key="index"
      v-if="item.images.length >= 3 "
    >
      <div class="title">{{item.title}}</div>
      <div class="article" v-html="item.summary"></div>
      <div class="imgLists">
        <img :src="item.images[0]" alt />
        <img :src="item.images[1]" alt />
        <img :src="item.images[2]" alt />
      </div>
      <div class="Info">
        <div class="left">
          <span class="city">
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}
          </span>
          <span class="userImg">
            by
            <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
            {{item.account.nickname}}
          </span>
          <span class="browseVolume">
            <i class="el-icon-view"></i>
            {{item.watch === null ? 0 : item.watch}}
          </span>
        </div>
        <span class="like">{{item.like === null? 0 : item.like}} 赞</span>
      </div>
    </div>
    <!-- 一张跟二张时的布局 -->
    <div
      class="singleImgPost"
      v-for="(item,index) in articleData"
      :key="index"
      v-if="item.images.length ===1 || item.images.length ===2"
    >
      <div class="imgOne">
        <img :src="item.images[0]" alt />
      </div>

      <div class="articleList">
        <div class="title">{{item.title}}</div>
        <div class="article" v-html="item.summary"></div>

        <div class="Info">
          <div class="left">
            <span class="city">
              <i class="el-icon-location-outline"></i>
              {{item.cityName}}
            </span>
            <span class="userImg">
              by
              <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
              {{item.account.nickname}}
            </span>
            <span class="browseVolume">
              <i class="el-icon-view"></i>
              {{item.watch === null ? 0 : item.watch}}
            </span>
          </div>
          <span class="like">{{item.like === null? 0 : item.like}} 赞</span>
        </div>
      </div>
    </div>
    <!-- 没有图片 -->
    <div
      class="normal"
      v-for="(item,index) in articleData"
      :key="index"
      v-if="item.images.length ===0"
    >
      <div class="title">{{item.title}}</div>
      <div class="article" v-html="item.summary"></div>

      <div class="Info">
        <div class="left">
          <span class="city">
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}
          </span>
          <span class="userImg">
            by
            <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
            {{item.account.nickname}}
          </span>
          <span class="browseVolume">
            <i class="el-icon-view"></i>
            {{item.watch === null ? 0 : item.watch}}
          </span>
        </div>
        <span class="like">{{item.like === null? 0 : item.like}} 赞</span>
      </div>
    </div>

    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div class="hint" v-if="articleData.length === 0 && isShow">！该城市暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    cityData: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      articleData: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0,
      isShow: false
    };
  },
  methods: {
    getpostsList(){
      let data = {
        _start: this.pageIndex,
        _limit: this.pageSize
      }
      if(this.cityData) {
        data.city = this.cityData
      }
      console.log(data);
      
      this.$axios({
      url: "posts",
      params: data
    }).then(res => {
      console.log(res.data);
      const { data, total } = res.data;
      this.articleData = data;
      this.total = total;
      this.isShow = true;
    });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getpostsList()

    },
    handleCurrentChange(val) {
      // 改变当前页码
      this.pageIndex = val;
      // 重新获取文章列表页
      this.getpostsList()
    }
  },
  mounted() {
    this.getpostsList()
  },
  watch: {
    cityData() {
      this.getpostsList()
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  .search {
    border: 3px solid orange;
    position: relative;
    .input {
      width: 660px;
      height: 40px;
      outline: none;
      border: none;
      font-size: 16px;
      text-indent: 20px;
    }
    i {
      cursor: pointer;
      position: absolute;
      top: 8px;
      font-size: 24px;
      color: orange;
      font-weight: 700;
    }
  }
  .SuggestedCity {
    padding: 10px 0;
    em {
      padding-right: 5px;
      font-size: 12px;
      color: #666;
    }
    .cities {
      cursor: pointer;
      padding-right: 3px;
      font-size: 12px;
      color: #666;
      &:hover {
        color: orange;
        text-decoration: underline;
      }
    }
  }
  .strategy {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    .title {
      box-sizing: border-box;
      color: orange;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        height: 2px;
        width: 77px;
        background-color: orange;
      }
    }
    .write {
      cursor: pointer;
      width: 106px;
      height: 40px;
      border-radius: 5px;
      margin-bottom: 14px;
      line-height: 40px;
      text-align: center;
      background: #409eff;
      color: #fff;
    }
  }
  // 三张图片布局
  .articleDetails {
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    .title {
      font-size: 24px;
      color: #000;
      font-weight: 700px;
      &:hover {
        color: orange;
      }
    }
    .article {
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      margin: 15px 0;
    }
    .imgLists {
      display: flex;
      img {
        width: 200px;
        height: 150px;
        margin-right: 10px;
      }
    }
    .Info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      span {
        padding: 7px;
        color: #666;
      }
      .userImg {
        display: inline-block;
        padding-top: 20px;
        img {
          vertical-align: middle;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
      .like {
        font-size: 18px;
        color: orange;
      }
    }
  }
  // 一张或者两张图片
  .singleImgPost {
    border-bottom: 1px solid #ccc;
    padding: 30px 0;
    display: flex;
    cursor: pointer;
    .articleList {
      width: 65%;
      margin-left: 48px;
      .article {
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .user {
        border-bottom: none;
        font-size: 13px;
      }
    }
    .imgOne {
      width: 30%;
      img {
        width: 250px;
      }
    }
    .Info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      span {
        padding: 7px;
        color: #666;
      }
      .userImg {
        display: inline-block;
        padding-top: 20px;
        img {
          vertical-align: middle;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
      .like {
        font-size: 18px;
        color: orange;
      }
    }
  }
  // 没有图片
  .normal {
    border-bottom: 1px solid #ccc;
    padding: 30px 0;
    .title {
      font-size: 24px;
      color: #000;
      font-weight: 700px;
      &:hover {
        color: orange;
      }
    }
    .article {
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .Info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      span {
        padding: 7px;
        color: #666;
      }
      .userImg {
        display: inline-block;
        padding-top: 20px;
        img {
          vertical-align: middle;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
      .like {
        font-size: 18px;
        color: orange;
      }
    }
  }
  .pagination {
    padding: 10px 0;
  }
      .hint {
      width: 100%;
      text-align: center;
      line-height: 80px;
      font-size: 18px;
    }
}
</style>