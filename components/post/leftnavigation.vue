<template>
  <div class="leftNav">

    <div class="cityNav" @mouseleave="hiddenhotCities">

      <div class="strategy">
        <div v-for="(item,index) in cityMenuList" :key="index" 
        :class="{active: index === currentIndex&&isShow}"
        @mouseover="getHotCities(index)">
          {{item.type}}
          <span class ="el-icon-arrow-right"></span>
      </div>
    </div>

    <div class="hotCities" v-if="isShow" >
      <p v-for="(item,index) in cityMenuList[currentIndex].children" :key="index">
        <span class="ranking">{{index + 1}}</span>
        <span class="city">{{item.city}}</span>
        <span class="describe">{{item.desc}}</span>
      </p>
      <i class="border"></i>
    </div>

  </div>

    <div class="recommendCity">
    <h3>推荐城市</h3>
    <img src="~/assets/images/pic_sea.jpeg" alt="">
    </div>  
</div>
</template>

<script>
export default {
  data(){
    return {
      cityMenuList: [],
      isShow: false,
      currentIndex: null,
    }
  },
  methods: {
    getHotCities(index) {
      this.isShow = true
      this.currentIndex = index;
    },
    hiddenhotCities() {
      this.isShow = false
    }
  },
  // 侧边城市菜单数据
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      const {data} = res.data;
      this.cityMenuList = data
      
    })
  }
}
</script>

<style lang="less" scoped>
  .leftNav {
    position: relative;
    margin-top: 20px;
    width: 260px;
    .cityNav {
      position: relative;
      .strategy {
        position: relative; 
        z-index: 11;
        div {
          line-height: 40px;
          padding-left: 20px;
          border: 1px solid #ccc;
          border-bottom: none;
          font-size: 16px;
          &:last-child {
            border-bottom: 1px solid #ccc;
          }
          &:hover {
            color: #FFA500;
            span {
              color: #FFA500;
            }
          }
          span {
            padding-left: 130px;
            font-size: 24px;
            color: #ccc;
          }
        }
      }
    }

    .hotCities {
      position: absolute;
      top: 0;
      left: 259px;
      padding: 10px 15px;
      width: 350px;
      height: 180px;
      border: 1px solid #ddd;
      border-left: 0;
      background: #fff;
      z-index: 2;
      p {
        height: 36px;
        .ranking {
          cursor: pointer;
          padding: 0 10px;
          font-size: 24px;
          font-style: italic;
          color: #FFA500;
        }
        .city {
          cursor: pointer;
          padding-right: 5px;
          color: #FFA500;
          font-size: 14px;
          &:hover {
            text-decoration: underline;
          }
        }
        .describe {
          cursor: pointer;
           color: #99a6c4;
            &:hover {
          text-decoration: underline; 
        }
        } 
      }
          .border {
          height: 37px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-left: 1px solid #ddd;
        }
    }
    .recommendCity{
        h3 {
          margin: 20px 0 12px 0;
          font-weight: normal;
          font-size: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ddd;
        }
      img {
        cursor: pointer;
        width: 260px;
        height: 173px;
        display: block;
      }
    }
  }
  .active {
    position: relative;
    z-index: 11;
    border-right: #fff !important;
  }
</style>