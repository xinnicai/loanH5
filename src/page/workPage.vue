<template>
  <div>
    <div class="header">
      <mt-header title="上班信息">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="page-content">
      <mt-field label="单位性质" placeholder="请选择单位性质" v-model="organization" >
        <div @click="organizationVisible = true"><img src="../assets/arrow.png"/></div>
      </mt-field>
      <mt-field label="自雇人士"  v-model="selfHire">
        <div @click="selfHireVisible = true"><img src="../assets/arrow.png"/></div>
      </mt-field>
      <mt-field label="打卡工资" placeholder="请选择工资发放形式"  v-model="wages" >
        <div @click="wagesVisible = true"><img src="../assets/arrow.png"/></div>
      </mt-field>
      <mt-field label="工资金额" type="textarea" rows="1" v-bind:style="styledkgzObj" v-model="dakaWagesNum">

      </mt-field>
      <mt-field label="有无社保" placeholder="请选择有无社保"   v-model="socialSecurity">
        <div @click="socialSecurityVisible = true"><img src="../assets/arrow.png"/></div>
      </mt-field>
      <mt-field placeholder="请填写已交月数" type="textarea" rows="1" v-bind:style="styleObj" v-model="socialSecurityMonth">

      </mt-field>
      <mt-field label="本地公积金" placeholder="请选择本地公积金" v-model="localSecurity" >
        <div @click="localSecurityVisible = true"><img src="../assets/arrow.png"/></div>
      </mt-field>
      <mt-field placeholder="请填写已交月数" type="textarea" rows="1" v-bind:style="stylegjjObj" v-model="localSecurityMonth">

      </mt-field>
    </div>
    <div class="button-group" style="margin-top: 20px;">
      <div @click="sendWorkPageData"><img src="../assets/下一步.png" style="width: 92%;"/></div>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="wagesVisible"
        position="bottom" >
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="organizationVisible"
        position="bottom" >
        <mt-picker :slots="organizationSlots" @change="onOrganizationValuesChange"></mt-picker>
      </mt-popup>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="socialSecurityVisible"
        position="bottom" >
        <mt-picker :slots="socialSecuritySlots" @change="onSocialSecurityValuesChange"></mt-picker>
      </mt-popup>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="localSecurityVisible"
        position="bottom" >
        <mt-picker :slots="localSecuritySlots" @change="onLocalSecurityValuesChange"></mt-picker>
      </mt-popup>
    </div>
    <div class="sexPicker" style="width:100%;">
      <mt-popup
        v-model="selfHireVisible"
        position="bottom" >
        <mt-picker :slots="selfHireSlots" @change="onSelfHireValuesChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { Toast } from 'mint-ui';
    export default {
        name: "work-page",
      data(){
          return {
            wagesVisible: false,  //选择器的显示与影藏
            slots: [
              {
                flex: 1,
                values: ['无','有'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            organizationVisible: false,  //选择器的显示与影藏
            organizationSlots: [
              {
                flex: 1,
                values: ['国企','事业单位','私企',],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            organization:'',
            socialSecurityVisible: false,  //选择器的显示与影藏
            socialSecuritySlots: [
              {
                flex: 1,
                values: ['无','有'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],

            socialSecurityMVisible:'block',
            localSecurityVisible: false,  //选择器的显示与影藏
            localSecuritySlots: [
              {
                flex: 1,
                values: ['否','是',],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            selfHireVisible: false,  //选择器的显示与影藏
            selfHireSlots: [
              {
                flex: 1,
                values: ['是','否'],
                className: 'slot1',
                textAlign: 'center',
                flex: 1
              }
            ],
            styleObj:{
              display:'none'
            },

            stylegjjObj:{
              display:'none'
            },

            styledkgzObj:{
              display:'none'
            },

            organization:'',//单位性质
            selfHire:'',//自雇人士
            wages:'',//打卡工资
            dakaWagesNum:'',//打卡工资金额
            socialSecurity:'',//社保
            socialSecurityMonth:'',//已交社保月数
            localSecurity:'',//本地公积金
            localSecurityMonth:'',//已交本地公积金月数

          }
      },
      methods: {
        onValuesChange(picker, values) {
          this.wages = values[0];
          if(this.wages=="有"){
            this.styledkgzObj.display="block";
          }else{
            this.styledkgzObj.display="none";
          }
          this.wagesVisible = false;
        },
        onOrganizationValuesChange(picker, values) {
          this.organization = values[0];
          this.organizationVisible = false;
        },
        onSocialSecurityValuesChange(picker, values) {
          this.socialSecurity = values[0];
          if(this.socialSecurity=="有"){
            this.styleObj.display='block';
          }else{
            this.styleObj.display='none';
          }
          this.socialSecurityVisible = false;
        },
        onLocalSecurityValuesChange(picker, values) {
          this.localSecurity = values[0];
          if(this.localSecurity=="是"){
            this.stylegjjObj.display='block';
          }else{
            this.stylegjjObj.display='none';
          }
          this.localSecurityVisible = false;
        },
        onSelfHireValuesChange(picker, values) {
          this.selfHire = values[0];
          this.selfHireVisible = false;
        },
        sendWorkPageData(){
          this.$router.push('/propertyPage');
          axios({
            method: 'post',
            url: 'user',
            data: {
              'organization':this.organization,//单位性质
              'selfHire':this.selfHire,//自雇人士
              'wages':this.wages,//打卡工资
              'dakaWagesNum':this.dakaWagesNum,//打卡工资金额
              'socialSecurity':this.socialSecurity,//社保
              'socialSecurityMonth':this.socialSecurityMonth,//已交社保月数
              'localSecurity':this.localSecurity,//本地公积金
              'localSecurityMonth':this.localSecurityMonth,//已交本地公积金月数
            }
          }).then((response) => {
            let data=response.data.content.data; //返回数据

          }).catch((error) => {
            console.log(error)
          });
        }
      }
    }
</script>

<style scoped>

</style>
