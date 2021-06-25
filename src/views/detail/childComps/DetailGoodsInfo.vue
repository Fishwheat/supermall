<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-text-wrap">
      <div class="text-top-style"></div>
      <div class="desc info-text-desc">{{ detailInfo.desc }}</div>
      <div class="text-bot-style"></div>
    </div>
    <div class="img-list-wrap" v-for="item in detailInfo.detailImage">
      <div class="desc">{{ item.key }}</div>
      <div v-for="(item, index) in item.list" :key="index">
        <img :src="item" alt="" class="img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

 
};
</script>

<style scoped>
.info-text-wrap {
  position: relative;
}
.text-top-style {
  width: 60px;
  height: 1px;
  background-color: #333;
  margin-left: 4px;
}
.info-text-wrap .text-bot-style {
  width: 60px;
  height: 1px;
  background-color: #333;
  position: absolute;
  right: 4px;
  bottom: 0;
}
.info-text-wrap .info-text-desc {
  padding: 10px 4px;
}

.desc {
  font-size: 14px;
  padding-bottom: 6px;
  line-height: 20px;
  margin: 4px 0;
  text-indent: 10px;
}
.img {
  width: 100%;
}
</style>
