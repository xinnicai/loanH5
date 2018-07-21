<template>
  <div>
    <div class="header">
      <mt-header title="资产信息">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="page-content">
      <mt-field label="按揭房产" >
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': isActive, 'page-home-button-active': hasError }" @click="setActive"><span>有</span></a>
        <a  class="enter-transition"   v-bind:class="{ 'page-home-button': !isActive, 'page-home-button-active': !hasError }" @click="setActive"><span>无</span></a>
      </mt-field>
      <mt-field label="已还月数" placeholder="请填写已交月数" type="textarea" rows="1" v-bind:style="styleajfcObj" v-model="ajAsset.ajMonth">

      </mt-field>
      <mt-field label="房产地址" placeholder="请填写房产地址" type="textarea" rows="1" v-bind:style="styleajfcObj" v-model="ajAsset.ajAdd">

      </mt-field>
      <mt-field label="抵押房产">
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': isdyActive, 'page-home-button-active': hasdyError }" @click="setdyActive"><span>有</span></a>
        <a  class="enter-transition"   v-bind:class="{ 'page-home-button': !isdyActive, 'page-home-button-active': !hasdyError }" @click="setdyActive"><span>无</span></a>
      </mt-field>
      <mt-field label="已还月数" placeholder="请填写已还月数" type="textarea" rows="1" v-bind:style="styledyObj" v-model="dyAsset.dyMonth">

      </mt-field>
      <mt-field label="房产地址" placeholder="请填写房产地址" type="textarea" rows="1" v-bind:style="styledyObj" v-model="dyAsset.dyAdd">

      </mt-field>
      <mt-field label="车产">
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': noCar, 'page-home-button-active': hasCar }" @click="setCarActive"><span>有</span></a>
        <a  class="enter-transition"  v-bind:class="{ 'page-home-button': !noCar, 'page-home-button-active': !hasCar }" @click="setCarActive"><span>无</span></a>
      </mt-field>
      <mt-field label="本人寿险">
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': noInsurance, 'page-home-button-active': hasInsurance }" @click="setInsuranceActive"><span>有</span></a>
        <a  class="enter-transition"  v-bind:class="{ 'page-home-button': !noInsurance, 'page-home-button-active': !hasInsurance }" @click="setInsuranceActive"><span>无</span></a>
      </mt-field>
      <mt-field label="信用卡额度" placeholder="请选择信用卡额度" v-model="creditSelected" ><div @click="creditVisible = true"><img src="../assets/arrow.png"/></div></mt-field>
      <mt-field label="有无芝麻分" placeholder="请选择有无芝麻分"v-model="zhimaSelected" ><div @click="zhimaVisible = true"><img src="../assets/arrow.png"/></div></mt-field>
      <mt-field label="有无微粒贷">
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': noLoan, 'page-home-button-active': hasLoan }" @click="setLoanActive"><span>有</span></a>
        <a  class="enter-transition"  v-bind:class="{ 'page-home-button': !noLoan, 'page-home-button-active': !hasLoan }" @click="setLoanActive"><span>无</span></a>
      </mt-field>
      <mt-field label="是否紧急" >
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': noEmergency, 'page-home-button-active': hasEmergency }" @click="setEmergencyActive"><span>紧急</span></a>
        <a  class="enter-transition" v-bind:class="{ 'page-home-button': !noEmergency, 'page-home-button-active': !hasEmergency }" @click="setEmergencyActive"><span>不紧急</span></a>
      </mt-field>
      <mt-field placeholder="请填写原因" type="textarea" rows="4" >

      </mt-field>
    </div>
    <div class="button-group" style="margin-top: 20px;">
      <div @click="sendDataInfo()"><router-link :to="{name: 'successPage', query: {id: 1}}"><img src="../assets/完成.png" style="width: 92%;"/></router-link></div>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="zhimaVisible"
        position="bottom" >
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="creditVisible"
        position="bottom" >
        <mt-picker :slots="creditSlots" @change="onCreditValuesChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<style>
  .page-home-button {
    display: inline-block;
    color: #95c3ff;
    width: 50px;
    font-size: 12px;
    padding: 10px;
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    border-color: #95c3ff;
    -o-border-image: initial;
    border-image: initial;
    border-radius: 18px;
  }
  .enter-transition {
    transition: opacity 2s, color 0.2s, background-color 0.2s;
    background-color: transparent;
  }
  .page-home-button-active {
    display: inline-block;
    width: 50px;
    font-size: 12px;
    padding: 10px;
    border-width: 2px;
    border-style: solid;
    border-color: #95c3ff;
    border-image: initial;
    border-radius: 18px;
    color: rgb(255, 255, 255);
    background-color: #95c3ff;
  }
</style>
<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: "property-page",
      data(){
          return{
            isActive:true,
            hasError:false,
            isdyActive:true,
            hasdyError:false,
            noCar:true,
            hasCar:false,
            noInsurance:true,
            hasInsurance:false,
            noLoan:true,
            hasLoan:false,
            noEmergency:true,
            hasEmergency:false,
            zhimaVisible: false,  //选择器的显示与影藏
            slots: [
              {
                flex: 1,
                values: ['一万','五万','十万','二十万','五十万'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            zhimaSelected:'',//芝麻分额度
            creditVisible: false,  //选择器的显示与影藏
            creditSlots: [
              {
                flex: 1,
                values: ['一万','五万','十万','二十万','五十万'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            creditSelected:'',//信用卡额度
            styleajfcObj:{
              display:'none'
            },
            styledyObj:{
              display:'none'
            },
            ajAsset:{   //按揭房产
              isTrue:'无',// 有无
              ajMonth:'',//已还月数
              ajAdd:'',//房产地址
            },
            dyAsset:{  //抵押房产
              isTrue:'无',//有无
              dyMonth:'',//已还月数
              dyAdd:'',//房产地址
            },
            carAsset:'无',//车产
            insurance:'无',//本人寿险
            weiLoan:'无',//微粒贷
            emergency:'不紧急',//是否紧急
            emergencyReason:""//紧急原因
          }
      },
      methods:{
        onValuesChange(picker, values) {
          this.zhimaSelected = values[0];
          this.zhimaVisible = false;
        },
        onCreditValuesChange(picker, values) {
          this.creditSelected = values[0];
          this.creditVisible = false;
        },
        setActive(){
          this.isActive=!this.isActive;
          this.hasError=!this.hasError;
          if(this.isActive==false){
            this.ajAsset.isTrue="有";
            this.styleajfcObj.display="block";
          }else{
            this.ajAsset.isTrue="无";
            this.styleajfcObj.display="none";
          }
        },
        setdyActive(){
          this.isdyActive=!this.isdyActive;
          this.hasdyError=!this.hasdyError;
          if(this.isdyActive==false){
            this.dyAsset.isTrue="有";
            this.styledyObj.display="block";
          }else{
            this.dyAsset.isTrue="无";
            this.styledyObj.display="none";
          }
        },
        setCarActive(){
          this.noCar=!this.noCar;
          if(this.noCar==false){
            this.carAsset="有"
          }else{
            this.carAsset="无"
          }
          this.hasCar=!this.hasCar;
        },
        setInsuranceActive(){
          this.noInsurance=!this.noInsurance;
          if(this.noInsurance==false){
            this.insurance="有";
          }else{
            this.insurance="无";
          }
          this.hasInsurance=!this.hasInsurance;
        },
        setLoanActive(){
          this.noLoan=!this.noLoan;
          if(this.noLoan==false){
            this.weiLoan="有";
          }else{
            this.weiLoan="无";
          }
          this.hasLoan=!this.hasLoan;
        },
        setEmergencyActive(){
          this.noEmergency=!this.noEmergency;
          this.hasEmergency=!this.hasEmergency;
        },
        sendDataInfo(){//发数据给后台
          axios({
                  method: 'post',
                  url: 'user',//请求接口
                  data: {
                    'ajAsset':this.ajAsset.isTrue,   //有无按揭房产
                    'ajMonth':this.ajAsset.ajMonth,//已还月数
                    'ajAdd':this.ajAsset.ajAdd,//房产地址
                    'dyAsset':this.dyAsset.isTrue ,//有无抵押房产
                    'dyMonth':this.dyAsset.dyMonth,//已还月数
                    'dyAdd':this.dyAsset.dyAdd,//房产地址
                    'carAsset':this.carAsset,//车产
                    'insurance':this.insurance,//本人寿险
                    'weiLoan':this.weiLoan,//微粒贷
                    'emergency':this.emergency,//是否紧急
                    'emergencyReason':this.emergencyReason//紧急原因
                    }
                  }).then((response) => {
                  let data=response.data.content.data; //返回数据
                  Toast({
                    message: '信息已保存',
                  });
                }).catch((error) => {
                  console.log(error)
                });
        },
      }
    }
</script>

<style scoped>

</style>
