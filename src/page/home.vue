<template>
    <div class="home-page">
      <div class="header">
        <mt-header title="申请贷款">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
      </div>
      <div class="page-content">
        <div type="img" class="page-img" style="background-color: transparent;margin: 30px;padding-top: 48px;">
          <img src="../assets/banner1.png" style="height: 195px;display: block;width: 100%;border-radius: 8px;"/>
        </div>
        <div class="page-form" style="margin-top: 30px">
          <div class="form-cell">
            <div class="aui-cell">
              <div class="aui-cell__bd">
                <input type="tel" placeholder="请输入手机号" maxlength="11" class="aui-input" v-model="telephone">
              </div>
            </div>
          </div>
          <div class="form-cell">
            <div class="aui-cell aui-cell--before-show"><!---->
              <div class="aui-cell__bd">
                <input type="tel" placeholder="请输入验证码" maxlength="6" class="aui-input w600" v-model="verficateCode">
                <!--<div class="code-btn" style="color: rgb(255, 215, 45);">获取验证码</div>-->
                <button class="code-btn" :disabled='disabled' data-id="2" @click="getVerificationCode()">
                  {{time}}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group" style="margin-top: 10px;">
        <div @click="getDataInfo()"><img src="../assets/立即注册.png" style="width: 92%;" /></div>
      </div>
      </div>

    </div>
</template>
<script>
  import axios from 'axios';
  import { Toast } from 'mint-ui';
    export default {
      data(){
        return{
          disabled:false,
          date:'请选择日期',
          fun_id:2,
          time: '获取验证码', //倒计时
          currentTime:61,
          telephone:'',//电话号码
          verficateCode:''//验证码
        }
      },
      methods:{
        getCode: function (options){
          var interval=null;
          var that = this;
          var currentTime = that.currentTime;
          if(currentTime==61){//发送验证码
            axios({
              method: 'post',
              url: 'user',//请求接口
              data: {
                "telephone": this.telephone,
              }
            }).then((response) => {
              let data=response.data.content.data; //返回数据
              Toast({
                message: '验证码已发送',
              });
            }).catch((error) => {
              console.log(error)
            });
          }
          interval = setInterval(function () {
            currentTime--;
            that.time=currentTime+'秒';
            console.log(this.time);
            if (currentTime <= 0) {
              clearInterval(interval)
                that.time= '重新发送';
              that.currentTime=61;
              that.disabled= false;

            }
          }, 1000)
        },
        getVerificationCode(){
          this.getCode();
          var that = this;
          this.disabled=true;
        },
        getDataInfo(){
          this.$router.push('/loanPage');
          axios({
            method: 'post',
            url: 'user',
            data: {
              "verficateCode":this.verficateCode,
              "telephone": this.telephone,
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
    .aui-navbar{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 2.87733rem;
      padding: 0 .32rem;
      background-image: linear-gradient(143deg,#f1a08f 40%,#ec7870)
    }
    .aui-navbar__back{
      float: left;
      line-height: 1.87733rem;
      padding: 0 .384rem;
      color: #222;
      font-size: .85333rem;
      position: relative;
      z-index: 1;
      margin-top: 0.5rem;
    }
    .aui-navbar__title{
      font-family: Source Han Sans CN;
      position: absolute;
      display: block;
      width: 100%;
      padding: 0;
      margin: 0 -.32rem;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.37733rem;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      -webkit-margin-before: 0.67em;
      -webkit-margin-after: 0.67em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
    }
    .home-page{
        height: 100%;
        width: 100%;
        /*background: url(../assets/4.jpg) no-repeat;*/
        background-size: 100%;
    }
    .page-form{
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      padding: 0 3.66667rem;
      min-height: 9.77778rem;
    }
    .form-cell{
      margin-top: 0rem;
      background-color: #fff;
      font-size: .59733rem;
      overflow: hidden;
      position: relative;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      border-bottom: 1px solid #e4e4e4;
    }
    .code-btn {
      width: 4.6rem;
      height: 2.5rem;
      line-height: 2.33333rem;
      position: absolute;
      right: 0;
      top: 0.1rem;
      font-size: 0.56296rem;
      text-align: center;
      /* border: 1px solid #f9f9f9; */
      border-radius: 10px;
      background-color: transparent;
      color:rgb(255, 215, 45);
    }
    .aui-input{
      width: 100%;
      border: 0;
      outline: 0;
      -webkit-appearance: none;
      background-color: transparent;
      font-size: inherit;
      color: inherit;
      height: 2.768rem;
      line-height: 1.28571429;
    }
    .aui-cell{
      padding: 0 0.31111rem 0 0.14815rem;
      margin: 0;
      height: 3.048rem;
      box-sizing: border-box;
      display: flex;
      -webkit-box-align: center;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      margin-top: .42667rem;
      background-color: #fff;
      font-size: .59733rem;
      overflow: hidden;
      position: relative;
    }
    .aui-cell__bd {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      color: #222;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .button-group{
        padding: 0px 15px;
        position: relative;
        transform: translateY(-50%);
        top: 50%;
    }
    .button-group span{
        display: block;
        margin-bottom: 15px;
        width: 100%;
        height: 40px;
        border-radius: 6px;
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1px #b8bbbf;
    }
    .button-group span a{
        line-height: 40px;
        color: #656b79;
        display: block;
    }
</style>
