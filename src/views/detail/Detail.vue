<template>
  <div id="detail">
    <detail-nav-bar class="content" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll
    class="zhang"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
    
      <div class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" ></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommed"></goods-list>
      </div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";

import { getDetail,Goods,Shop,Param,getRecommend } from "../../network/detail";

// import { debounce } from "../../common/utils.js";

import {backTopMixin} from "../../common/mixin";

// import Toast from "../../components/common/toast/Toast";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      // message: '',
      // show: false
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);
    // console.log(this.$route);
    //2.根据iid请求详情数据
    this.getDetail();
    //3.请求推荐数据
    this.getRecommend()
  },
  mounted(){
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // //对监听的事件进行保存
    // this.itemImgListener = () => {
    //   // console.log('------------');
    //   refresh();
    // }
    
  },
  updated(){
  
  },
  
  methods: {
    getDetail() {
      //根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        // console.log(res);
        //获取轮播图数据
        this.topImages = res.data.result.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(res.data.result.itemInfo,res.data.result.columns, res.data.result.shopInfo.services)
        //创建店铺信息的对象
        this.shop = new Shop(res.data.result.shopInfo)
        //保存商品的详情数据
        this.detailInfo = res.data.result.detailInfo
        //获取参数的信息
        this.paramInfo = new Param(res.data.result.itemParams.info,res.data.result.itemParams)
        //取出评论信息
        if(res.data.result.rate.cRate !== 0){
          this.commentInfo = res.data.result.rate.list[0]
        }

        // this.$nextTick(() => {
        //   //这个方法会在上面的数据传输后在别的组件渲染完了后触发调用一次，这个渲染不包括图片
        //   //根据最新的数据，对应的dom是已经被渲染出来了
        //   //但是图片依然是没有加载完
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommed.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      });
    },
    getRecommend(){
      getRecommend().then(res => {
        this.recommends = res.data.data.list
        // console.log(res);
         this.$nextTick(() => {
          //这个方法会在上面的数据传输后在别的组件渲染完了后触发调用一次，这个渲染不包括图片
          //根据最新的数据，对应的dom是已经被渲染出来了
          //但是图片依然是没有加载完
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommed.$el.offsetTop)
          // this.themeTopYs.push(Number.MAX_VALUE) //多加入一个非常大的值
          console.log(this.themeTopYs)
        })
      })
    },
    
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      // console.log(index);
    },
    contentScroll(position){
      //获取Y值
      const positionY = -position.y
      //positionY和主题里的值进行对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){//length - 1
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i === length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
        //简单写法
        // if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
        //   this.currentIndex = i
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        this.demo(position)
      }
    },
    loadMore(){},
    addToCart(){
      //获取购物车需要的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        // this.show = true
        // this.message = res
        
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1500)
        this.$toast.show(res, 1000)
        console.log(this.$toast);
      })
    }
  },
};
</script>

<style scoped>

#detail{
  position: relative;
  height: 44px;
  z-index: 25;
  background-color: #fff;
  
}
.zhang{
  position: relative;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
  background-color: #fff;
}
</style>