<template>
  <div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="flex shop-name-info">
      <img :src="shop.logo" alt="" class="shop-img" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="flex shop-other-info">
      <div class="flex shop-other-item shop-other-sell">
        <div class="zhuijia">
          <p class="f16">{{ shop.sells | saveNum }}</p>
          <p>总销量</p>
        </div>
        <div class="zhuijia">
          <p class="f16">{{ shop.goodsCount }}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-other-item shop-other-right">
        <div v-for="item in shop.score">
          {{ item.name }}&ensp;
          <span class="score" :class="{ active: item.isBetter }">{{
            item.score
          }}</span>
          <span class="score-bg" :class="{ active: item.isBetter }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="enter-shop-wrap">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  filters: {
    saveNum(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.f16 {
  font-size: 16px;
}
.shop-name-info {
  align-items: center;
  margin: 20px 10px;
}
.shop-name-info .shop-img {
  border: 1px solid #ccc;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}

.shop-other-info {
  display: flex;
  font-size: 12px;
  align-items: center;
  line-height: 22px;
}
.shop-other-info .shop-other-item {
  flex: 1;
}
.shop-other-info .shop-other-sell {
  display: flex;
  border-right: 1px solid #ececec;
}
.shop-other-info .shop-other-sell .zhuijia{
  flex: 1
}
.shop-other-info .shop-other-sell div {
  flex: 1;
  text-align: center;
}
.shop-other-info .shop-other-right {
  padding-left: 40px;
}
.shop-other-info .shop-other-right .score {
  display: inline-block;
  width: 30px;
  color: #006666;
}


.shop-other-info .shop-other-right .score-bg {
  background-color: #006666;
  color: #fff;
  padding: 1px 4px;
  font-size: 12px;
}
.shop-other-info	.shop-other-right	.active{
	color: red;
}
.enter-shop-wrap {
  margin-top: 10px;
  text-align: center;
  width: 100%;
}
.enter-shop-wrap .enter-shop {
  margin-left: 25%;
  width: 50%;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  background-color: #ddd;
  font-size: 14px;
}

</style>
