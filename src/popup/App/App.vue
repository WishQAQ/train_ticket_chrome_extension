<template>
  <el-card class="box-card">
    <div slot="header">
      <span>火车票务系统</span>

    </div>
    <div>213123</div>
  </el-card>
</template>

<script>
  export default {
  name: 'app',
  data(){
    return {
      loginForm: {
        account: 'rainbow',
        password: '12345611'
      }, // 登录信息
    }
  },
  methods:{

  }
}
</script>

<style>
.box-card {
  width: 300px;
}
</style>
