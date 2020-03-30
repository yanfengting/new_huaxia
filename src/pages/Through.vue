<template>
  <div>
    <Nav></Nav>
    <div class="view-wrapper"
         id="brand">
      <cube-scroll-nav :current="current"
                       @change="changeHandler"
                       @sticky-change="stickyChangeHandler"
                       ref="scroll">
        <cube-scroll-nav-panel v-for="item in brandArr"
                               :key="item.title"
                               :label="item.title">
          <div class="item-content"
               style='font-size:13px'
               v-html="item.content"></div>
        </cube-scroll-nav-panel>
        <div class="bottom-desp"
             v-show="bottomshow">
          <hr>
          <span>我是有底线的哦</span>
          <hr>
        </div>
      </cube-scroll-nav>
    </div>
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'

export default {
  data () {
    return {
      current: '',
      brandArr: [],
      bottomshow: false
    }
  },
  created: function () {
    var userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo) // 转为JSON
    this.axios({
      method: 'get',
      url: '/api/route/view',
      headers: { token: this.userInfo.token }
    }).then((res) => {
      // console.log(res)
      if (res.data.status === 200) {
        this.brandArr = res.data.data
        this.current = res.data.data[0].title
        this.bottomshow = true
        // let _this = this
      } else if (res.data.status === 401) {
        this.$router.replace('/')
      } else {
        console.log('数据获取失败，请刷新重试')
      }
    })
  },
  methods: {
    changeHandler (label) {
      if (label !== 'cube-scroll-nav-bar' && label !== '') {
        this.current = label
      }
    },
    stickyChangeHandler (current) {
      if (current !== 'cube-scroll-nav-bar' && current !== '') {
        this.current = current
      }
    }
  },
  components: {
    Nav
  }
}
</script>
<style>
</style>
