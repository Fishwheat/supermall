<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    // message:{
    //   type: String,
    //   default: ''
    // },
    // show:{
    //   type: Boolean,
    //   default: false
    // },
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认文字', duration = 1500) {
      console.log('-----');
      this.isShow = true;
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  background: rgba(0,0,0, .8);
  color: #fff;
  z-index: 999;
}
</style>