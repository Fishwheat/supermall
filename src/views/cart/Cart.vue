<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import {mapGetters} from 'vuex';

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
    //两种语法
    //1. ...mapGetters(['cartLength','xxxxxxx'])
    //2. ...mapGetters({cartLength: "cartLength",xxxx: "yyyy"})
    ...mapGetters({
      cartLength: "cartLength",
    })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: #ff8198;
  color: #fff;
  font-weight: 600;
}
</style>