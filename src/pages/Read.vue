<template>
    <div>
        <Nav></Nav>
        <div class="tab-wrapper">
            <Readtab :tabs="tabs" :initialIndex='initindex'></Readtab>
        </div>
    </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import Readtab from '../components/tab/Readtab'
  import News from '../components/read/News'
  import Novel from '../components/read/Novel'
  import Magazine from '../components/read/Magazine'
  export default {
    data() {
      return {
        readArr: [{
          label: '',
          data: [{ seller: '' }]
        }],
        // ebookArr: []
        initindex: 0
      }
    },
    created: function () {
      const _self = this
      const initindex = sessionStorage.getItem('readInitIndex')
      if (initindex) {
        this.initindex = parseInt(initindex)
      } else {
        this.initindex = 0
      }
      console.log('here', this.initindex)
      this.axios.get('/api/ebook/listType').then(
        res => {
          if (res.status === 200) {
            const newTabs = []
            newTabs.push(
              {
                label: '新闻',
                component: News,
                data: {
                  seller: []
                }
              }
            )
            res.data.data.forEach(function (item, index) {
              newTabs.push({
                label: item.type,
                component: Novel,
                data: {
                  seller: item.id
                }
              })
            })
            newTabs.push({
              label: '杂志',
              component: Magazine,
              data: {
                seller: []
              }
            })
            _self.readArr = newTabs
          }
        })
    },
    computed: {
      tabs: {
        get: function () {
          return this.readArr
        },
        set: function (value) { // value用于判断哪个tab的值作为选中值,默认label的值
          this.readArr = value
        }
      }
    },
    components: { Nav, Readtab }
  }
</script>
<style lang="stylus">
  .tab-wrapper
    position fixed
    top 50px
    bottom 0
    left 0
    right 0
</style>
