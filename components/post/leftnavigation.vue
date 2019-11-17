<template>
  <div class="leftNav">

    <div class="cityNav" @mouseleave="hiddenhotCities">

      <div class="strategy">
        <div v-for="(item,index) in cityMenuList" :key="index" @mouseover="getHotCities(index)">
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
    </div>

  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      cityMenuList: [],
      isShow: false,
      currentIndex: 0,
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
    width: 260px;
    height: 165px;
    .cityNav {
      position: relative;
      .strategy {
        div {
          line-height: 40px;
          padding-left: 20px;
          border: 1px solid #ccc;
          border-bottom: none;
          font-size: 16px;
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
      left: 249px;
      padding: 10px 15px;
      width: 350px;
      height: 200px;
      border: 1px solid #ccc;
      background: #fff;
      z-index: 999;
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
    }
  }
</style>