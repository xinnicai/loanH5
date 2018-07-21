<template>
    <div>
      <div class="header">
        <mt-header title="借款信息">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
      </div>
      <div class="page-content">
        <mt-field label="借款金额" placeholder="0.5-50万" v-model="loanNum" ></mt-field>
        <mt-field label="借款期限" placeholder="请选择借款期限" type="email" v-model="loanDateSelected" ><div @click="sexVisible = true"><img src="../assets/arrow.png"/></div></mt-field>
        <mt-field label="姓名" placeholder="中文名字" type="password" v-model="name" ></mt-field>
        <mt-field label="身份证号" placeholder="请输入身份证号" type="password"  v-model="idNum"></mt-field>
        <mt-field label="年龄" placeholder="请输入年龄" v-model="age" ></mt-field>
        <mt-field label="户籍地址" placeholder="请输入户籍地址"  v-model="idAdd"></mt-field>
        <mt-field label="居住地址" placeholder="请输入居住地址"  v-model="liveAdd"></mt-field>
        <mt-field label="文化程度" placeholder="请选择当前学历" v-model="collegeSelected"  ><div @click="collegeVisible = true"><img src="../assets/arrow.png"/></div></mt-field>
        <mt-field label="是否有成功贷款" placeholder="请选择是否有成功贷款" v-model="loanSelected" ><div @click="loanVisible = true"><img src="../assets/arrow.png"/></div></mt-field>
        <mt-field label="建议联系时间" placeholder="请选择您希望的联系时间" v-model="timeSelected" ><div @click="timeVisible = true"><img src="../assets/arrow.png"/></div></mt-field>
      </div>
      <div class="button-group" style="margin-top: 20px;">
        <div @click="veridate()"><img src="../assets/下一步.png" style="width: 92%;"/></div>
      </div>
      <div class="sexPicker" style="width:100%;">
        <mt-popup
          v-model="sexVisible"
          position="bottom" >
          <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="sexPicker" style="width:100%;">
        <mt-popup
          v-model="cityVisible"
          position="bottom" >
          <mt-picker :slots="cityslots" @change="onCityValuesChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="sexPicker" style="width:100%;">
        <mt-popup
          v-model="collegeVisible"
          position="bottom" >
          <mt-picker :slots="collegeslots" @change="onCollegeValuesChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="sexPicker" style="width:100%;">
        <mt-popup
          v-model="workVisible"
          position="bottom" >
          <mt-picker :slots="workslots" @change="onWorkValuesChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="sexPicker" style="width:100%;">
        <mt-popup
          v-model="loanVisible"
          position="bottom" >
          <mt-picker :slots="loanslots" @change="onLoanValuesChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="sexPicker" style="width:100%;">
        <mt-popup
          v-model="timeVisible"
          position="bottom" >
          <mt-picker :slots="timeslots" @change="onTimeValuesChange"></mt-picker>
        </mt-popup>
      </div>
    </div>
</template>
<script>
  import axios from 'axios';
  import { Toast } from 'mint-ui';
    export default {
        name: "loan-page",
      data(){
          return {
            sexVisible: false,  //选择器的显示与影藏
            slots: [
              {
                flex: 1,
                values: ['一个月','三个月','六个月','一年','两年'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            cityVisible: false,  //选择器的显示与影藏
            cityslots: [
              {
                flex: 1,
                values: ['上海','北京','杭州','广州','苏州','宁波'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            collegeVisible: false,  //选择器的显示与影藏
            collegeslots: [
              {
                flex: 1,
                values: ['大专','本科','硕士','博士'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            workVisible: false,  //选择器的显示与影藏
            workslots: [
              {
                flex: 1,
                values: ['国企','私企','工程师'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            loanVisible: false,  //选择器的显示与影藏
            loanslots: [
              {
                flex: 1,
                values: ['是','否'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            timeVisible: false,  //选择器的显示与影藏
            timeslots: [
              {
                flex: 1,
                values: ['8:00-12:00','12:00-14:00','14:00-18:00','18:00-21:00'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            loanNum:'',//借款金额
            loanDateSelected:'',//借款日期
            collegeSelected:'',//文化程度
            workSelected:'',
            loanSelected:'',//是否有贷款
            timeSelected:'',//联系时间
            name:'',//姓名
            idNum:'',//身份证号
            age:'',//年龄
            idAdd:'',//户籍所在地
            liveAdd:''//居住地址
        }
    },
      methods:{
        onValuesChange(picker, values) {
          this.loanDateSelected = values[0];
          this.sexVisible = false;
        },
        onCityValuesChange(picker, values) {
          this.citySelected = values[0];
          this.cityVisible = false;
        },
        onCollegeValuesChange(picker, values) {
          this.collegeSelected = values[0];
          this.collegeVisible = false;
        },
        onWorkValuesChange(picker, values) {
          this.workSelected = values[0];
          this.workVisible = false;
        },
        onLoanValuesChange(picker, values) {
          this.loanSelected = values[0];
          this.loanVisible = false;
        },
        onTimeValuesChange(picker, values) {
          this.timeSelected = values[0];
          this.timeVisible = false;
        },
        veridate(){
          let loanNumFlag=true,nameFlag=true,idFlag=true,ageFlag=true,idAddFlag=true,liveAddFlag=true;
          if(this.loanNum==""){
            Toast({
              message: '请填写借款金额',
            });
            loanNumFlag=false;
          } else if(this.name==""){
            Toast({
              message: '请填写姓名',
            });
            nameFlag=false;
          } else if(this.idNum==""){
            Toast({
              message: '请填写身份证号',
            });
            idFlag=false;
          } else if(this.age==""){
            Toast({
              message: '请填写年龄',
            });
            ageFlag=false;
          }else if(this.idAdd==""){
            Toast({
              message: '请填写户籍所在地',
            });
            idAddFlag=false;
          }else if(this.liveAdd==""){
            Toast({
              message: '请填写居住地址',
            });
            idAddFlag=false;
          };
          if(loanNumFlag&&nameFlag&&idFlag&&ageFlag&&idAddFlag&&liveAddFlag==true)
          this.sendLoanPageData();
        },
        sendLoanPageData(){
          this.$router.push('/workPage');
          axios({
            method: 'post',
            url: 'user',
            data: {
              'loanNum':this.loanNum,//借款金额
              'loanDateSelected':this.loanDateSelected,//借款日期
              'collegeSelected':this.collegeSelected,//文化程度
              'loanSelected':this.loanSelected,//是否有贷款
              'timeSelected':this.timeSelected,//联系时间
              'name':this.name,//姓名
              'idNum':this.idNum,//身份证号
              'age':this.age,//年龄
              'idAdd':this.idAdd,//户籍所在地
              'iveAdd':this.iveAdd//居住地址
            }
          }).then((response) => {
            let data=response.data.content.data; //返回数据

          }).catch((error) => {
            console.log(error)
          });
        },

      }
    }
</script>


