<template>
  <div class="app-wrap">
    <LoginDiv v-if="showLogin"></LoginDiv>
    <ContactPersonDiv v-if="showPerson"></ContactPersonDiv>
    <TicketRouteDiv v-if="showTicket"></TicketRouteDiv>
    <ChoosePassengerDiv v-if="showPassenger"></ChoosePassengerDiv>
  </div>
</template>

<script>
  import '../utils/viewsDom'
  import LoginDiv from './components/login'  // 登录页
  import ContactPersonDiv from './components/contactPerson' // 常用联系人页
  import TicketRouteDiv from './components/ticketRoute'  // 查询车票页
  import ChoosePassengerDiv from './components/choosePassenger'  // 选择乘客页

  export default {
    name: 'app',
    components:{
      LoginDiv,
      ContactPersonDiv,
      TicketRouteDiv,
      ChoosePassengerDiv
    },
    data() {
      return {
        showLogin: false, // 登录页
        showPerson: false, // 联系人页
        showTicket: false, // 购票页
        showPassenger: false, // 选择乘客页
      }
    },
    methods: {
      getViewName(){
      },
    },
    mounted() {
      this.showLogin = window.location.pathname === '/otn/resources/login.html'
      this.showPerson = window.location.pathname === '/otn/view/passengers.html' || window.location.pathname === '/otn/view/passenger_edit.html';
      this.showTicket = window.location.pathname === '/otn/leftTicket/init'
      this.showPassenger = window.location.pathname === '/otn/confirmPassenger/initDc'
    },
    watch:{
      $route(to,from){
        console.log(to);
      }

    }
  }
</script>

<style lang="less">
  .el-dialog__wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute !important;
    .el-dialog{
      margin: 0 !important;
      .el-dialog__header{
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:rgba(51,148,250,1);
        padding: 0 40px 0 20px;
        .el-dialog__title{
          font-size:20px;
          color:rgba(255,255,255,1);
        }
        .el-dialog__headerbtn{
          position: unset;
          >i{
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .el-dialog__footer{
        .dialog-footer{
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button{
            padding: 12px 50px;
            font-size:16px;
          }
        }
      }
    }
  }
</style>
