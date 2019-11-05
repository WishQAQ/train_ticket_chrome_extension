<template>
  <div class="login">
    <div class="login_box" v-if="loginBox">
      <div class="login_title">OA票务平台账户登录</div>
      <el-form>
        <el-form-item label="账号">
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="login_submit" type="primary" @click="submitLogin">登录</el-button>
    </div>
    <div class="user_message_table" v-else>
      <el-table
          class=""
          :data="myAccountList"
          ref="loginTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          border
          style="width: 100%">
        <el-table-column
            label="序号"
            align="center"
            width="50px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
            prop="account"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码">
        </el-table-column>
        <el-table-column
            prop="remarks"
            label="备注">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="选择路程城市"
        append-to-body
        custom-class="step_dialog"
        :show-close="false"
        :visible.sync="stepDialog"
        width="30%">
      <el-image
          style="width: 100px; height: 100px"
          :src="StepImage"
          preview-src-list="../../utils/step.png"
          fit="contain"></el-image>
    </el-dialog>

  </div>
</template>

<script>
  import StepImage from '../../utils/step.png'

  export default {
    name: 'login',
    data() {
      return {
        stepDialog: true, // 提示窗口
        StepImage: url(${require('../../utils/step.png')}),
        loginBox: true, // 登录窗口

        loginForm: {
          account: 'rainbow',
          password: '123456'
        }, // 登录信息

        loginUserName: {},
        loginUserPassword: {},

        submitLoginBtn: false, // 登录按钮状态

        myAccountList: [], // 我的12306账号列表
      }
    },
    methods: {
      /**
       * @Description: 登录按钮
       * @author Wish
       * @date 2019/11/5
      */
      submitLogin(){
        let data ={
          account: this.loginForm.account,
          password: this.loginForm.password
        }
        this.$axios.post('http://oa.huimin.dev.cq1080.com/account/login',data)
            .then(res =>{
              if(res.data.code === 0){
                sessionStorage.setItem('CSRF', res.data.result.csrf);
                this.getMyAccount()
                this.$message.success('OA平台登录成功')
              }else {
                this.$message.warning(res.data.code)
              }
            })
            .catch(() =>{
              this.$message.warning('请在浏览器地址栏右侧选择加载此脚本')
            })
      },
      /**
       * @Description: 获取我的12306账号列表
       * @author Wish
       * @date 2019/11/5
      */
      getMyAccount(){
        if(sessionStorage.CSRF) {
          this.$axios.get('http://oa.huimin.dev.cq1080.com/system/12306_account/showMe/10')
              .then(res => {
                if (res.data.code === 0) {
                  this.loginBox = false
                  this.myAccountList = res.data.result.data
                }
              })
        }
      },

      /**
       * @Description: 取消选中
       * @author Wish
       * @date 2019/11/5
      */
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      /**
       * @Description: 选中账号
       * @author Wish
       * @date 2019/11/5
      */
      handleCurrentChange(val) {
        this.loginUserName = window.document.getElementById('J-userName')
        this.loginUserPassword = window.document.getElementById('J-password')
        this.loginUserName.value = val.account
        this.loginUserPassword.value = val.password
      },

      /**
       * @Description: 登录插件账号
       * @author Wish
       * @date 2019/11/5
      */
      clickViewBtn(){
        let data ={
          account: this.loginUserName.value,
          password: this.loginUserPassword.value
        }
        if(this.loginUserName.value && this.loginUserPassword.value){
          this.$axios.post('http://oa.huimin.dev.cq1080.com/plug/login',data)
              .then(res =>{
                if(res.data.code === 0){
                  sessionStorage.setItem('Account', this.loginUserName.value);
                  sessionStorage.setItem('Password', this.loginUserPassword.value);
                  window.document.getElementById("J-login").style.pointerEvents = 'auto'
                  setTimeout(() =>{
                    window.document.getElementById("J-login").click()
                  },100)
                }else {
                  this.$message.warning(res.data.msg+'，三秒后刷新该页面')
                  setTimeout(() =>{
                    window.location.href="https://kyfw.12306.cn/otn/resources/login.html"
                  },300)
                }
              })
        }
      },
    },
    mounted(){
      let submitViewLoginBtn = document.getElementsByClassName("login-btn")
      submitViewLoginBtn[0].style.cursor = 'pointer'
      let submitViewLogin = document.getElementById("J-login")
      submitViewLogin.style.pointerEvents = 'none'
      console.log(submitViewLoginBtn[0]);
      let _this = this
      submitViewLoginBtn[0].addEventListener("click", function(e){
        _this.clickViewBtn()
      });

      // if(this.submitLoginBtn){
      //   submitViewLogin.style.pointerEvents = ''
      //   submitViewLogin.addEventListener("click", () =>{
      //
      //   })
      // }
      console.log(this.StepImage);
    },
    created() {
      this.getMyAccount()
    }
  }
</script>

<style scoped lang="less">
  .login{
    position: absolute;
    top: 0;
    left: 5%;
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    z-index: 1101;
    padding-top: 80px;
    .login_box{
      width: 50%;
      .login_title{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 40px;
      }
      .login_submit{
        width: 120px;
        margin-top: 20px;
      }
    }
    .user_message_table{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
    }
  }
</style>
