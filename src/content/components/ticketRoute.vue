<template>
  <div class="ticketRoute">
    <div class="ticket_table">
      <div class="table_box" v-for="(item ,index) in passengerList" :key="index">
        <div class="order_id">{{item.order_sn}}</div>
        <div class="order_message_box">
          <div class="order_message" v-for="(cItem, cIndex) in item.trips" :key="cIndex">
            <div class="message_info" v-for="(dItem, dIndex) in cItem.info" :key="dIndex" @click="getTicketData(dItem,item.order_sn)">
              <div class="ticket_time">{{$getTimeYear(dItem.riding_time * 1000)}}</div>
              <div class="ticket_info">
                <p>{{dItem.departure_station}}</p>
                <span>{{dItem.trips_number}}</span>
                <p>{{dItem.arrival_station}}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <el-dialog
        title="选择路程城市"
        append-to-body
        custom-class="checked_address_dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :visible.sync="checkedAddressDialog"
        width="30%">
      <el-form label-width="80px">
        <el-form-item label="出发地">
          <el-radio-group v-model="toAddress" size="medium">
            <el-radio-button
                v-for="(item, index) in addressInfo.alike_departure"
                :key="index"
                :label="item.code">
              {{item.name}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目的地">
          <el-radio-group v-model="formAddress" size="medium">
            <el-radio-button
                v-for="(item, index) in addressInfo.alike_arrival"
                :key="index"
                :label="item.code">
              {{item.name}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkedAddressDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddress()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "ticketRoute",
    data(){
      return {
        passengerList: [],

        addressInfo: {},
        checkedAddressDialog: false, // 地址弹窗
        toAddress: '',
        formAddress: '',
      }
    },
    methods:{
      /**
       * @Description: 获取列表
       * @author Wish
       * @date 2019/11/5
      */
      getDataList(){
        this.$axios.get('http://oa.huimin.dev.cq1080.com/plug/obtain')
            .then(res =>{
              if(res.data.code === 0) {
                this.passengerList = res.data.result
              }else {
                this.$message.warning(res.data.msg)
              }
            })
      },

      /**
       * @Description: 获取路线信息
       * @author Wish
       * @date 2019/11/5
      */
      getTicketData(val,orderId){
        this.checkedAddressDialog = true
        this.toAddress = ''
        this.formAddress = ''
        window.document.getElementById('fromStationText').value = val.departure_station

        window.document.getElementById('toStationText').value = val.arrival_station

        window.document.getElementById('train_date').value = this.$getTimeYear(val.riding_time * 1000)

        this.addressInfo = val

        sessionStorage.setItem('order_sn', orderId);
        sessionStorage.setItem('ticketInfo', JSON.stringify(val));

      },
      /**
       * @Description: 提交路线信息
       * @author Wish
       * @data 2019/11/6
      */
      submitAddress(){
        if(this.toAddress && this.formAddress){
          window.document.getElementById('toStation').value = this.toAddress
          window.document.getElementById('fromStation').value = this.formAddress
          setTimeout(() =>{
            window.document.getElementById('query_ticket').click()
          },300)
          this.checkedAddressDialog = false
        }else {
          this.$message.warning('请选择出发地与目的地')
        }
      },

    },
    created() {
      this.getDataList()
    }
  }
</script>

<style scoped lang="less">
  .ticketRoute{
    position: absolute;
    left: 1%;
    top: 130px;
    width: 30%;
    min-width: 500px;
    height: 100vh;
    padding-bottom: 30px;
    overflow-y: auto;
    background: #fff;

    .ticket_table{
      border: 1px solid #ebeef5;
      font-size: 14px;
      .table_box{
        display: flex;
        align-items: center;
        &:not(:last-child){
          border-bottom: 1px solid #ebeef5;
        }
        .order_id{
          width: 140px;
          margin-right: 10px;
          flex-shrink: 0;
          padding-left: 10px;
        }
        .order_message_box{
          width: 100%;
          border-left: 1px solid #ebeef5;
          .order_message{
            &:not(:last-child){
              border-bottom: 1px solid #ebeef5;
            }
            .message_info{
              display: flex;
              align-items: center;
              padding-left: 15px;
              height: 45px;
              &:hover{
                background: #f1f1f1;
                cursor: pointer;
              }
              &:not(:last-child){
                border-bottom: 1px solid #ebeef5;
              }
              .ticket_time{
                margin-right: 20px;
              }
              .ticket_info{
                display: flex;
                align-items: center;
                justify-content: center;
                >span{
                  margin: 0 15px;
                  width: 65px;
                  height: 22px;
                  display: inline-flex;
                  justify-content: center;
                  position: relative;
                  &::after{
                    content: '';
                    position: absolute;
                    width: 90%;
                    left: 0;
                    bottom: 0;
                    height: 1px;
                    background:  rgba(38,153,251,1);
                  }
                  &::before{
                    content: '';
                    position: absolute;
                    right: 0;
                    bottom: -5px;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                    border-left: 6px solid rgba(38,153,251,1);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
