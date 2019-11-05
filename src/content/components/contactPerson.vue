<template>
  <div class="contactPerson">
    <div class="oa_header">
      <el-button size="mini" type="primary" @click="jumpPayTicket">前往购票</el-button>
    </div>
    <div class="oa_table">
      <el-table
          border
          :data="personList"
          @current-change="handleCurrentChange"
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
            prop="passengerName"
            label="联系人">
        </el-table-column>
        <el-table-column
            prop="IDCard"
            label="身份证">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contactPerson",
    data(){
      return {
        passengerList: [],
        personList: []
      }
    },
    methods:{
      /**
       * @Description: 获取路线信息 遍历出联系人列表
       * @author Wish
       * @date 2019/11/5
      */
      getDataList(){
        this.$axios.get('http://oa.huimin.dev.cq1080.com/plug/obtain')
            .then(res =>{
              if(res.data.code === 0){
                this.passengerList = res.data.result
                let personData = []
                this.passengerList.forEach(item =>{
                  item.trips.forEach(cItem =>{
                    cItem.info.forEach(dItem =>{
                      dItem.passengers.forEach(eItem =>{
                        personData.push({
                          passengerName: eItem.passengerName,
                          IDCard: eItem.IDCard
                        })
                      })
                    })
                  })
                })

                let hash = {};
                personData = personData.reduce((item, next) => {
                  hash[next.IDCard]?'':hash[next.IDCard]=true&&item.push(next);
                  return item;
                }, []);

                this.personList = personData
              }else {
                this.$message.warning(res.data.msg)
              }
            })
      },

      /**
       * @Description: 跳转添加联系人页面
       * @author Wish
       * @date 2019/11/5
      */
      handleCurrentChange(val) {
        if (window.location.pathname === '/otn/view/passengers.html') {
          window.location.href = "https://kyfw.12306.cn/otn/view/passenger_edit.html?type=add"
        } else {
          window.document.getElementById('name').value = val.passengerName
          window.document.getElementById('cardCode').value = val.IDCard

          if((val.IDCard.charAt(17) % 2 == 0)){
            window.document.getElementById('female').checked = true
              // window.document.getElementsByClassName('check-inline')[4].checked = true
              // window.document.getElementsByClassName('check-inline')[3].checked = false
            }else {
            window.document.getElementById('man').checked = true
            // window.document.getElementsByClassName('check-inline')[4].checked = false
            // window.document.getElementsByClassName('check-inline')[3].checked = true
            }

        }
      },

      /**
       * @Description: 跳转购票界面
       * @author Wish
       * @date 2019/11/5
      */
      jumpPayTicket(){
        window.location.href = "https://kyfw.12306.cn/otn/leftTicket/init"
      },
    },
    created() {
      this.getDataList()
    }
  }
</script>

<style scoped lang="less">
  .contactPerson{
    position: absolute;
    left: 2%;
    top: 170px;
    width: 38%;
    .oa_header{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 20px;
      >p{
        font-size: 18px;
      }
    }
    .oa_table{
      width: 100%;
    }
  }
</style>