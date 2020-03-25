<template>
  <!--style="box-shadow: 0px 0px 10px 2px rgb(214, 213, 213);"-->
  <header class="mui-bar mui-bar-nav"
          style="display: flex;flex-direction: row;align-items: center; justify-content: space-between">
    <a @click="back"
       class="mui-action-back mui-icon mui-icon-back">
      <!--<img class="logo-left" src="../../assets/images/zuobianjiantou.png">-->
      <div class="back-icon"></div>
      <!--<i class="iconfont icon-zuobianjiantou"></i>-->
    </a>
    <h1 class="mui-title"
        @click="itinerary">
      <div class="start"
           v-if="flightDetail.departDetail">
        <span class="site">{{flightDetail.departDetail.city}}</span>
        <span class="time">出发{{startDate}}</span>
      </div>
      <div class="start"
           v-else>
        <span class="site">出发地</span>
      </div>

      <div class="middle">
        <span class="site">
          <div class="flight"></div>
          <!--<div class="flight" style="background-image: url('../../assets/images/flight.png') ; background-repeat: no-repeat;background-position: center center; background-size: 100% 100%;"></div>-->
        </span>
        <span class="time"
              v-if="type === 400">直达</span>
        <span class="time"
              v-else>通程
          <!--{{tcinfo.arriveDetail.city}}--></span>
      </div>
      <div class="start"
           v-if="flightDetail.arriveDetail">
        <span class="site">{{flightDetail.arriveDetail.city}}</span>
        <span class="time"
              v-if="day>0"
              style="display: flex">{{endDate}} <div style="line-height: 1">+{{day}}</div> </span>

        <span class="time"
              v-else>到达{{endDate}}</span>
      </div>
      <div class="start"
           v-else>
        <span class="site">目的地</span>
      </div>
    </h1>
    <template v-if="this.$store.state.playFlag">
      <a href="javascript:;"
         @click="Music"
         class="mui-icon mui-action-menu mui-icon-bars music-btn">
        <div class="music-btn music-btn-icon"
             alt></div>
      </a>
    </template>
    <!--<a class="mui-action-back mui-icon mui-icon-back mui-pull-left">-->
    <a href="javascript:;"
       v-if="this.$store.state.show"
       class=" mui-icon mui-action-menu mui-icon-bars"
       style="width: 35px;z-index:11111">
      <!-- <img class="logo-left" src="../assets/images/左边箭头.png" alt> -->
      <div class="logo-first"
           v-if="this.$store.state.show"
           src=""
           alt></div>
      <div class="logo-first"
           v-else
           src="../assets/images/topmusic.png"
           alt></div>
    </a>
    <a @click="showSide"
       slot="overwrite-left"
       type="navicon"
       size="35"
       style="fill:#fff;padding-bottom: 0;"
       class="mui-icon mui-action-menu mui-icon-bars">
      <!--<i class="iconfont icon-1"></i>-->
      <div class="logo-right menu2"></div>
      <div v-if="orderNum>0"
           class="logo-right hongdian"
           style="height: 10px;width: 10px;left: 10px;position: absolute;border-radius: 50%;"></div>
    </a>
  </header>
</template>
<script>
export default {

}
</script>

<style>
/* 导航栏*/
* {
  outline: none;
  margin: 0;
  padding: 0;
}
.mui-action-menu {
  height: 20px;
  width: 7px;
}
.hongdian {
  background: url("../../assets/images/system/hongdian.png") no-repeat center
    center;
  background-size: 10px 10px;
  margin-top: -10px;
}
.back-icon {
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/system/zuobianjiantou.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 13px 18px;
}
.mui-action-back {
  width: 20px;
  height: 24px;
}
.mui-icon-back {
  /*height: 100%;*/
  z-index: 2;
}
.mui-bar {
  right: 0;
  left: 0;
  height: 50px;
  /* border-bottom: 1px solid rgb(118, 130, 151); */
  background-color: #fff;
  backface-visibility: hidden;
  padding: 10px 0px;
  padding-bottom: 0px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}
.mui-bar-nav {
  top: 0;
}
.mui-bar-nav.mui-bar .mui-icon {
  padding-right: 10px;
  padding-left: 10px;
}
.mui-bar .mui-icon {
  font-size: 18px;
  position: relative;
}
.mui-icon {
  font-family: Muiicons;
  font-weight: 400;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
}
.mui-pull-left {
  float: left;
}
.mui-pull-right {
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  color: #007aff;
}
.menu2 {
  background: url("../../assets/images/system/menu2.png") no-repeat no-repeat;
  background-size: 60% 100%;
  background-position: center center;
}
a {
  background: 0 0;
}
.mui-bar .mui-title {
  /*right: 40px;*/
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 66%;
  padding-right: 17px;
  margin: 0;
  text-overflow: ellipsis;
}
.mui-title {
  font-size: 17px;
  font-weight: 500;
  line-height: 25px;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  color: #000;
  margin: 0 auto;
}
.logo-left {
  vertical-align: top;
  padding-left: 10px;
  width: 100%;
  height: 100%;
}
.logo-right {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
/**
  width: 5px;
    height: 24px;
   */
.logo-first {
  vertical-align: top;
  width: 100%;
  height: 100%;
  /* width: 18px;
     height: 18px;*/
}
.start {
  height: 44px;
  width: 85px;
  display: inline-block;
  /* border: 1px solid #cdcdcd; */
}
.middle {
  height: 44px;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #cdcdcd; */
}
.site {
  display: block;
  /*height: 25px;*/
  font-size: 14px;
  font-weight: 200;
}
.flight {
  width: 18px;
  height: 10px;
  background: url("../../assets/images/system/flight.png") no-repeat;
  background-position: center center;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  margin: 0 auto;
  padding: 0;
}
.time {
  height: 10px;
  display: block;
  font-size: 10px;
  color: rgb(149, 169, 191);
  line-height: 18px;
}
.fly {
  height: 10px;
  display: block;
  font-size: 10px;
  color: rgb(149, 169, 191);
  line-height: 18px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.logo {
  width: 44px;
  position: relative;
  left: -10px;
}
/* 音乐图标 */
.Music {
  background: url("../../assets/images/system/muisc.png") no-repeat left top;
  background-size: 100% 100%;
}
a.music-btn,
div.music-btn {
  width: 20px;
  height: 20px;
}
.music-btn-icon {
  background-image: url("../../assets/images/system/topmusic.png");
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
}
</style>
