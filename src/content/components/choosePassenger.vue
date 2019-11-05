<template>
  <div class="choosePassenger">
1231313
  </div>
</template>

<script>
  export default {
    name: "choosePassenger",
    data(){
      return {

      }
    },
    methods:{

    },
    created() {
      console.log(sessionStorage.order_sn);
      console.log(sessionStorage.tiketInfo);
    }
  }
</script>

<style scoped lang="less">
  .choosePassenger{

  }
</style>