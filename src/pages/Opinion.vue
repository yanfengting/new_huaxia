<template>
  <div class="opinion-content">
    <Nav></Nav>
    <!--星星  -->
    <div class="star-wrapper"
         style="margin-top: 40px">
      <span style="color:#95a9bf;display: inline-flex;margin-right:10px">机舱环境</span>
      <cube-rate v-model="value1"></cube-rate>
    </div>
    <div class="star-wrapper">
      <span style="color:#95a9bf;display: inline-flex;margin-right:10px">服务态度</span>
      <cube-rate v-model="value2"></cube-rate>
    </div>
    <div class="star-wrapper">
      <span style="color:#95a9bf;display: inline-flex;margin-right:10px">整体印象</span>
      <cube-rate v-model="value4"></cube-rate>
    </div>
    <div class="info">
      <!--建议 -->
      <div style="margin: 8px 0px;border:1px solid #95a9bf;border-radius: 5px;">
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
        <div class="box box-active"
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
               :checked="checked" />

      </div>
      <!-- 手机 -->
      <cube-input ref="cubeinput"
                  v-model="phone"
                  placeholder="请输入您的手机号"></cube-input>
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
      <cube-button type="submit"
                   style="    background: linear-gradient(180deg,#349ffd,#027eea);"
                   @click="submitBtn">提 交
      </cube-button>
    </div>
  </div>
</template>
<script>
import registryToast from '../components/common/toast/index'
//  任何地方使用
//  registryToast.showToast('网络连接成功')
import Nav from '../components/common/Nav.vue'
import uploadImages from '../components/opinion/uploadImages'

export default {
  components: {
    // Nav,
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
      phone: '',
      checked: true,
      files: [],
      imgList: [],
      imgdata: '',
      errors: [],
      upload: [],
      flightDetail: [],
      orderNum: 0
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
    selCheck () {
      if (!this.checked) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    showSide: function () {
      this.$store.dispatch('showSideBar')
    },
    back2: function () {
      if (this.value3.length > 1 || this.imgdata.length > 0 || this.phone.length > 0) {
        if (confirm('是否确认退出？')) {
          this.$router.go(-1) // 返回上一层
        }
      } else {
        this.$router.go(-1) // 返回上一层
      }
    },
    fileChange (data) {
      // console.log('data')
      // console.log(data)
      this.imgdata = data
      // this.$options.methods.submitBtn(data)
    },
    submitBtn (e) {
      this.errors = []
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/ // 验证是不是以13,15,18,17开头的数字
      if (this.value1 === 0) {
        this.errors.push('请对机舱环境作出评价！')
      } else if (this.value2 === 0) {
        this.errors.push('请对服务态度作出评价！')
      } else if (this.value4 === 0) {
        this.errors.push('请对整体印象作出评价！')
      } else if (this.upload === '') {
        this.errors.push('请选择至少一张图片！')
      } else if (this.phone === '') {
        this.errors.push('请输入手机号！')
      } else if (this.phone.length !== 11) {
        this.errors.push('请输入11位的手机号码！')
      } else if (!myreg.test(this.phone)) {
        this.errors.push('请输入有效的手机号码！')
      } else {
        e.preventDefault()
        this.postData()
        // this.$router.push('/main')
        // console.log('submit', e)
      }
      /* else if (this.value3 === '') {
          this.errors.push('请输入意见或建议！')
        } */
      this.$refs.cubeinput.style = 'solid 1px red'
      if (this.errors.length > 0) {
        registryToast.showToast(this.errors[0])
      }
    },
    postData () {
      var newcheck = 1
      if (this.checked === true) {
        newcheck = 1 // 1是不匿名
      } else {
        newcheck = 2 // 2匿名
      }
      const teldata = new FormData()
      teldata.append('environment', this.value1) // 环境
      teldata.append('service', this.value2) // 服务态度
      teldata.append('detail', this.value3) // 详情描述
      teldata.append('comprehensive', this.value4) // 整体印象
      teldata.append('anonymous', newcheck) // 是否匿名
      teldata.append('mobile', this.phone) // 手机号
      for (let i = 0; i < this.imgdata.length; i++) {
        teldata.append('inputFile', this.imgdata[i].file)
      }
      const that = this
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo)
      const instans = this.axios.create({
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: this.userInfo.token
        }
      })
      const toast = this.$createToast({
        txt: '正在提交请稍后',
        mask: true
      })
      toast.show()
      instans.post('/api/feedback/submit', teldata).then(
        function (res) {
          toast.hide()
          // console.log(res)
          if (res.data.status === 200) {
            registryToast.showToast('提交成功')
            that.$router.push('/main')
          } else {
            registryToast.showToast('提交失败，请重试!')
          }
        },
        function (error) {
          toast.hide()
          console.log('请求出错', error)
        }
      )
    }
  }
}
</script>
<style type="text/css">

</style>
