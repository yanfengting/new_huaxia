<template>
  <div id="app">
    <router-view />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app'
  // components: {
  //   // HelloWorld
  // }
}
</script>

<style>
/* // 屏幕宽度大于500
// @media screen and (min-width: 500px) {
// body {
// margin: 0 auto;
// max-width: 500px;
// display: block;
// }
// } */
@media screen and (min-width: 320px) {
  html {
    font-size: 3vw;
  }
}
@media screen and (max-width: 640px) {
  html {
    font-size: 3.5vw;
  }
}
html {
  width: 100%;
  height: 100%;
}
body,html,#app {
  left: 0px;
  right: 0px;
  max-width: 640PX;
  min-width: 320PX;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  height: 100%;
}
body, #app {
  /* background-color: rgb(239, 239, 247); */
  /* margin: 0;
  padding: 0; */
  -webkit-overflow-scrolling: touch;
}
p {
  line-height: 25px;
}
img {
  max-width: 100%;
}
div.cube-dialog-fade-enter-active {
  -webkit-animation: none;
  animation: none;
}
.cube-sticky-ele {
  padding-top: 5px;
}
.my-content {
  text-align: center;
}
.my-radio {
  text-align: center;
  background: url('assets/images/system/radio_broadcast.png') no-repeat center bottom;
  -webkit-background-size: 40px 40px;
  background-size: 40px 40px;
  padding-top: 80px;
}
.cube-dialog-alert, .cube-dialog-confirm {
  z-index: 1111;
}
.cube-popup_mask cube-dialog {
  z-index: 1111;
}
.my-play {
  text-align: center;
  background: url('assets/images/system/prohibit.png') no-repeat center bottom;
  -webkit-background-size: 40px 40px;
  background-size: 40px 40px;
  padding-top: 80px;
}
.music-controls {
  position: fixed;
  background: #fff;
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* *.cube-scroll-content{
  padding-bottom: 80px
} */
.cube-tab {
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #ffffff;
  color: rgb(172, 180, 194);
  font-size: 14px;
}
.border-bottom-1px {
  overflow-x: scroll;
  height: 36px;
  white-space: nowrap;
  /* border-top 1px solid #dee0e2 */
  border-bottom: 1px solid #dee0e2;
  justify-content: space-between;
  flex-basis: 172 rpx;
}
input {
  -webkit-appearance: none;
}
input, button, select, textarea {
  outline: none;
}
.cube-tab {
  padding: 0px;
  background: #ffffff;
}
.cube-tab_active {
  color: #ffffff;
  background: linear-gradient(180deg, #4ca5f6, #027ee8);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
