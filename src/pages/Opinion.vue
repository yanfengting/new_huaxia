<template>
  <div class="opinion-content">
    <Nav></Nav>
    <!--星星  -->
    <div class="star-wrapper"
         style="margin-top: 40px">
      <span class="star">机舱环境</span>
      <cube-rate v-model="value1"></cube-rate>
    </div>
    <div class="star-wrapper">
      <span class="star">服务态度</span>
      <cube-rate v-model="value2"></cube-rate>
    </div>
    <div class="star-wrapper">
      <span class="star">整体印象</span>
      <cube-rate v-model="value4"></cube-rate>
    </div>
    <div class="info">
      <!--建议 -->
      <div class="suggest">
        <cube-textarea indicator="indicator"
                       v-model="value3"
                       placeholder="请输入您的意见或建议"
                       style="border: none"></cube-textarea>
        <div class="selectPic">
          <!-- <input multiple
                 type="file"
                 ref="file"
                 id="uploadFile"> -->
          <!--  multiple:是否支持多选
                  max:最多上传几张
                  list:编辑反显使用 -->
          <updatefile v-on:fileChange="fileChange"
                      :multiple="true"
                      :list="imgList"
                      ref="upload"
                      v-model='upload'></updatefile>
        </div>
      </div>
      <!-- 匿名 -->
      <div style="width:200px;font-size:13px;">
        <!--<cube-checkbox v-model="checked" style="color:#95a9bf;">匿名评价</cube-checkbox>
        -->
        <!-- <div class="box box-active"
             @click="selCheck()"
             v-if="checked">
          匿名评价
        </div>
        <div class="box"
             @click="selCheck()"
             v-if="!checked">
          匿名评价
        </div>
        <input type="checkbox"
               style="display: none;"
               :checked="checked" /> -->

      </div>
      <!-- 手机 -->
      <!-- <cube-input ref="cubeinput"
                  v-model="phone"
                  placeholder="请输入您的手机号"></cube-input> -->
      <br>
      <!--<p v-if="errors.length">
      <ul>
        <li class="error"
            v-for="error in errors"
            :key="error">{{ error }}
        </li>
      </ul>
      </p>-->
    </div>
    <div class="opinion-footer">
      <!-- <cube-button type="submit"
                   style="    background: linear-gradient(180deg,#349ffd,#027eea);"
                   @click="submitBtn">提 交
      </cube-button> -->
    </div>
  </div>
</template>
<script>
import registryToast from '../components/common/toast/index'
import Nav from '../components/common/Nav.vue'
import uploadImages from '../components/opinion/uploadImages'
export default {
  components: {
    updatefile: uploadImages,
    Nav: Nav
  },
  data () {
    return {
      value1: 0, // 环境
      value2: 0, // 态度
      value4: 0, // 印象
      value3: '', // 意见
      indicator: {
        negative: true,
        remain: true
      },
      imgList: [],
      upload: []
    }
  },
  created: function () {
    var userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo) // 转为JSON
    this.axios({
      method: 'post',
      url: '/api/order/unfinished'
    }).then((res) => {
      // console.log(res)
      if (res.status === 200) {
        this.orderNum = res.data.data
      } else {
        console.log('数据获取失败，请刷新重试')
      }
    })
    this.axios({
      method: 'get',
      url: '/api/flightDetail/get',
      headers: { token: this.userInfo.token }
    }).then((res) => {
      if (res.status === 200) {
        this.flightDetail = res.data.data
      } else {
        console.log('数据获取失败，请刷新重试')
      }
    })
  },
  methods: {
    fileChange (data) {
      this.imgdata = data
    },
    back2: function () {
      if (this.value3.length > 1 || this.imgdata.length > 0 || this.phone.length > 0) {
        if (confirm('是否确认退出？')) {
          this.$router.go(-1) // 返回上一层
        }
      } else {
        this.$router.go(-1) // 返回上一层
      }
    }
  }
}
</script>

<style type="text/css">
/* 星星 */
li.cube-rate-item.cube-rate-item_active div.cube-rate-item-def {
  background-image: url("../assets/images/system/start_red.png");
}
li.cube-rate-item div.cube-rate-item-def {
  /*background: url("..");*/
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: url("../assets/images/system/start_unacive.png");
}
/* 意见不加边框 */
/* 输入框固定 */
textarea::-webkit-input-placeholder {
  color: #cad5e2;
  font-weight: 200;
}

.cube-textarea-wrapper {
  height: 75px;
}

div.cube-textarea-wrapper:after {
  border: none;
}

textarea:-moz-placeholder {
  color: #cad5e2;
  font-weight: 200;
}

textarea:-ms-input-placeholder {
  color: #cad5e2;
  font-weight: 200;
}
/* 上传图片的X号边框 */
i.iconfont.icon-chahao.upload_warp_img_div_del {
  border: none;
}

/* input {
  border: 1px solid #c3c3c3;
}

.cube-input-field {
  width: 50%;
}

.cube-input-field.error {
  border: solid 1px red;
}

.box {
  height: 30px;
  width: 200px;
  line-height: 30px;
  padding-left: 24px;
}

.box-active {
  background: url("../assets/images/check_box.png") no-repeat;
  background-size: 15px 15px;
  background-position: left center;
}

.box-unactive {
  background: url("../assets/images/check_box.png") no-repeat;
  background-size: 15px 15px;
  background-position: left center;
}

.cube-input {
  width: 200px;
  background: rgba(247, 249, 252, 1);
}

.opinion-footer {
  position: relative;
  bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.opinion-footer .cube-btn {
  width: 90%;
}
*/
.opinion-content {
  /* background-color: rgba(247, 249, 252, 1); */
}
</style>
<style lang="stylus" scoped>
/* 星星 */
>>> .cube-rate {
  max-width: 60%;
}
.star {
  color: #95a9bf;
  display: inline-flex;
  margin-right: 10px;
}
.star-wrapper {
  font-size: 12px;
  width: 180px;
  margin-top: 0px;
  margin-left: 30px;
  margin-right: 30px;
  font-weight: 200;
  padding: 3px 0;
  text-align: left;
  line-height: 20px;
  .cube-rate-item {
    width: 25px;
    height: auto;
    background-size: 50%;
    background-color: grey;
    .cube-rate-item.active, .rate-item {
      background-color: orange;
    }
  }
}
// 意见
.info {
  margin: 0 30px;
  margin-bottom: 0px;
}
.selectPic {
  width: 100%;
}
.suggest {
  margin: 8px 0px;
  border: 1px solid #95a9bf;
  border-radius: 5px;
}
.error {
  color: red;
  font-size: 15px;
  margin: 10px;
}
.cube-scroll-nav-panel {
  margin: 10px auto;
}
.cube-upload-def .cube-upload-btn, .cube-upload-def .cube-upload-file {
  padding: 10px;
}
.upload_warp_text {
  display: none;
}
</style>
