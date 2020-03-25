<template>
  <div class="cab-common ">
    <div class="item"
         @click="addCart()">
      <div class="top-describe cab-demand cab-common">
        <!--<p class="second">Demand</p>-->
      </div>
      <span class="first-font">呼唤铃</span>
      <demand-alert :demand_sku="demand_sku"
                    :seat="newseat"></demand-alert>
    </div>
  </div>
</template>
<script>
import DemandAlert from './DemandAlert'

export default {
  components: { DemandAlert },
  props: {
    seat: {
      type: String
    },
    demand_sku: {
      type: Boolean
    }
  },
  data () {
    return {
      newseat: this.seat
    }
  },
  watch: {
    demand_sku: function (val, oldVal) {
      this.is_sku = val
    }
  },
  methods: {
    // 点呼唤铃
    addCart () {
      this.axios({
        method: 'get',
        url: 'api/callbell/chickUsable'
      }).then((res) => {
        if (res.data.status === 200) {
          if (!res.data.data) {
            this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
            return
          }
          this.demand_sku = true
        }
      })
    },
    // 点击蒙层取消
    cancelMask: function () {
      this.demand_sku = false
    }
  }
}
</script>
<style lang="stylus">
.orange
  /* background-color: snow; */
  /* color: white; */
.productConten p
  text-align left
.product-footerlist
  margin-top 10px
.product-footerlist li
  /* border: 1px dashed orange; */
  text-align center
  padding 5px 10px
  float left
  margin-right 10px
  margin-bottom 10px
.product-line
  line-height 20px
.product-footerlist li.productActive
  background-color #007fff
  color #007fff
.demand div.img-wrap
  height 122px
.product-footerlist li.noneActive
  background-color #ccc
  opacity 0.4
  color #000
  pointer-events none
.item
  width 100%
  text-align center
.specification_mask2
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.5)
  z-index 111111
.specification_com2
  position absolute
  bottom 0
  left 0
  width 100%
  background #fff
  border-radius 10px 10px 0px 0px
.sku_specification3
  /* border-top: 1px solid #EEEEEE */
  border-bottom 1px solid #EEEEEE
  box-sizing border-box
  margin auto 15px
.van-row--flex
  display -webkit-box
  display -webkit-flex
  display flex
.van-col--12
  width 50%
.van-col
  float left
  text-align left
  font-size 15px
  line-height 30px
  box-sizing border-box
.van-stepper__plus
  width 30px
  height 26px
  box-sizing border-box
  /* background-color: #fff; */
  /* background #ebedf0 */
  border 1px solid #ffff
  position relative
  /* padding: 5px; */
  vertical-align middle
.van-stepper__input
  width 30px
  height 20px
  padding 1px
  border 1px solid #ffffff
  /* border-width: 1px 0; */
  border-radius 0
  box-sizing content-box
  color #7d7e80
  font-size 15px
  vertical-align middle
  text-align center
  -webkit-appearance none
#number
  height 30px
  width 100px
  border-radius 3px
  float right
  border 1px solid #ebedf0
  text-align center
  font-size 20px
.choose_sku2
  max-height 300px
  overflow scroll
.sku-close
  width 30px
  display block
  float right
  text-align right
  padding 10px
.sku_title2
  font-size 15px
  height 0.5rem
  line-height 0.5rem
  text-align left
.sku_ul2
  display flex
  flex-wrap wrap
ol, ul
  margin 0
  padding 0
  list-style none
.sku_li2
  box-sizing border-box
  padding 5px 10px
  margin 0 0.15rem 0.15rem 0
  border-radius 5px
  font-size 15px
.productActive
  background #ffd100
.demandBtn
  color #fff
  /* background: #06f; */
  background linear-gradient(to bottom, rgb(52, 159, 253), rgb(2, 126, 234))
  width 92%
  margin 5px auto
.demandBtn1
  color #fff
  /* background: #06f; */
  background linear-gradient(to bottom, rgb(52, 159, 253), rgb(2, 126, 234))
  width 92%
  margin 10px auto
.demandBtn1:active
  background #06f
.demandBtn:active
  background #06f
</style>
