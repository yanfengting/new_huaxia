<template>
  <div>
    <Nav></Nav>
    <div class="tab-wrapper">
      <Gamestab :tabs="tabs"
                :initialIndex=0></Gamestab>
    </div>
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'
import Gamestab from '../components/tab/Gamestab'
import Quiz from '../components/games/Quiz'
// import Sports from '../components/games/Sports'
// import Risk from '../components/games/Risk'

export default {
  data () {
    return {
      // initindex: 0,
      gameArr: [{
        label: '',
        data: [{ seller: '' }]
      }]
    }
  },
  created: function () {
    const _this = this
    // const initindex = sessionStorage.getItem('gameInitIndex')
    // if (initindex) {
    //   this.initindex = parseInt(initindex)// 解析一个字符串,并返回一个整数。
    // } else {
    //   this.initindex = 0
    // }
    this.axios.get('/api/game/list').then(
      res => {
        // console.log(res)
        if (res.status === 200) {
          const tabs = []
          for (let i = 0; i < res.data.data.length; i++) {
            tabs.push({
              label: res.data.data[i].type,
              component: Quiz,
              data: {
                seller: res.data.data[i].items
              }
            })
          }
          _this.gameArr = tabs
          _this.tabs = tabs
          // _this.tabs = res.data.data
          // console.log(this.gameArr)
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  // 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
  computed: {
    tabs: {
      get: function () {
        return this.gameArr
      },
      set: function (value) {
        this.gameArr = value
      }
    }
  },
  components: { Nav, Gamestab }
}
</script>
<style lang="stylus">
div.tab-wrapper {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
