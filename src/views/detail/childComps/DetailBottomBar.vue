<template>
  <div id="bottom-bar">
    <div class="bottom-bar">
      <div class="bottom-one xiugai">
        <div class="bottom-one-img"></div>
        <span>客服</span>
      </div>
      <div class="bottom-two xiugai">
        <div class="bottom-two-img"></div>
        <span>店铺</span>
      </div>
      <div class="bottom-three xiugai">
        <div class="bottom-three-img"></div>
        <span>收藏</span>
      </div>
      <div class="bottom-four" @click="addToCart">
        加入购物车
      </div>
      <div class="bottom-five">
        购买
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(){
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
#bottom-bar{
  height: 49px;
  position: relative;
  bottom: 48px;
  right: 0;
  left: 0;
  z-index: 1;
}
.bottom-bar{
  display: flex;
  float: left;
  width: 100%;
  text-align: center;
  height: 49px;
  background-color: #fff;
}
.bottom-bar .bottom-one{
  float: left;
  flex: 16.6666%;
  font-size: 13px;
  
}
.bottom-one-img{
  position: absolute;
  width: 30px;
  height: 30px;
  background: url(../../../assets/img/detail/detail_bottom.png) no-repeat;
  background-size: 90%;
  background-position: 0 -65px;
}
.bottom-two-img{
  position: absolute;
  width: 30px;
  height: 30px;
  background: url(../../../assets/img/detail/detail_bottom.png) no-repeat;
  background-size: 90%;
  background-position: 0 -120px;
}
.bottom-three-img{
  position: absolute;
  width: 30px;
  height: 30px;
  background: url(../../../assets/img/detail/detail_bottom.png) no-repeat;
  background-size: 90%;
  background-position: 0 1px;
}
.bottom-bar .bottom-two{
  float: left;
  flex: 16.66666%;
  font-size: 13px;

}
.bottom-bar .bottom-three{
  float: left;
  flex: 16.666666%;
  font-size: 13px;
 
}
.bottom-bar .bottom-four{
  line-height: 49px;
  float: left;
  width: 27%;
  color: #000;
  background-color:#f5cf39;
}
.bottom-bar .bottom-five{
  line-height: 49px;
  float: left;
  width: 23%;
  color: #fff;
  background-color: #fc5aab;
}
.bottom-bar .xiugai {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-bar span{
  position: absolute;
  bottom: 5px;
}
</style>