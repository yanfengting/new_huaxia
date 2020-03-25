<template>
  <div id="flight-info">
    <Nav></Nav>

    <div class="bottom-desp" style="background: #ffffff;" v-show="bottomshow">
      <hr>
      <span>我是有底线的哦</span>
      <hr>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    components: {
      Nav: Nav
    },
    data() {
      return {

      }
    }
  }
</script>
