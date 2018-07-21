<template>
  <div class="success-page">
    <div class="header">
      <mt-header title="借款申请">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </div>
    <div class="page-content">
      <div type="img" class="page-img" style="background-color: transparent;margin: 30px; margin-bottom: 10px">
        <img src="../assets/banner2.png" style="height: 185px;display: block;width: 100%;border-radius: 8px;"/>
      </div>
      <div class="page-text">
            <span>申请成功</span>
      </div>
      <div class="button-group" style="margin-top: 20px;">
        <div><img src="../assets/完成.png" style="width: 92%;"/></div>
      </div>
    </div>

  </div>
</template>

<script>

    export default {
        name: "success-page"
    }
</script>

<style scoped>
.page-text{
  font-family: AdobeHeitiStd-Regular;
  font-weight: 600;
}
</style>
