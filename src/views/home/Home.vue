<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import tabControl from "../../components/content/tabControl/tabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backtop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
// import Swiper from "../../components/common/swiper/Swiper";
// import SwiperItem from "../../components/common/swiper/SwiperItem";
import { debounce } from "../../common/utils.js";

export default {
  name: "Home",
  components: {
    NavBar,
    tabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    Feature,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  destroyed() {
    console.log("destroyed");
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //对监听的事件进行保存
    this.itemImgListener = () => {
      // console.log('------------');
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        // console.log(res);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8198;
  color: #fff;
  
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 1;
}
</style>