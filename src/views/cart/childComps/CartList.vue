<template>
  <div class="cart-list">
    <scroll class="content" :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      ref="cartscroll"
      >
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";

import CartListItem from "./CartListItem"

import {mapGetters} from 'vuex';

export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.cartscroll.refresh()
  },
  methods:{
    contentScroll(){},
    loadMore(){}
  }
}
</script>

<style scoped>

.content{
  height: calc(100vh - 44px - 40px - 49px);
  overflow: hidden;
}
</style>
