import {debounce} from "./utils.js"
import BackTop from "../components/content/backtop/BackTop";

export const itemListenerMixin = {
  mounted() {
    let newRefresh = debouce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
  methods:{},
  data(){
    return{}
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    demo(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
}


import {POP, NEW, SELL} from "./const";
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
