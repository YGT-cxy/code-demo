<template>
  <view class="page-changshi">
    <view class="list">
      <view class="item">
        <image class="icon-img" src="/static/icon-huishou.png" />
      </view>
      <view class="item">
        <image class="icon-img" src="/static/icon-youhai.png" />
      </view>
      <view class="item">
        <image class="icon-img" src="/static/icon-shi.png" />
      </view>
      <view class="item">
        <image class="icon-img" src="/static/icon-gan.png" />
      </view>
    </view>
    <view class="doggerel">
      <view class="doggerel-title">
        <text>分类口诀</text>
      </view>
      <view class="doggerel-content">
        <view class="doggerel-item">
          <text>干湿要分开，能卖拿去卖，有害单独放。</text>
        </view>
        <view class="doggerel-item">
          <text>绿厨厨，灰其其，红危危，蓝宝宝。</text>
        </view>
        <view class="doggerel-item">
          <text>可回收，丢蓝色，有害垃圾丢红色。</text>
        </view>
        <view class="doggerel-item">
          <text>厨余垃圾是绿色，其它垃圾用灰色。</text>
        </view>
        <view class="doggerel-item">
          <text>垃圾多 ，危害大，分类摆放人人夸。</text>
        </view>
        <view class="doggerel-item">
          <text>餐厨垃圾单独放，有害垃圾，别乱抛。</text>
        </view>
        <view class="doggerel-item">
          <text>乱丢垃圾危害大，干干净净利大家。</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="less">
  page {
    background: #fff;
  }

  .page-changshi {

    & .list {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      padding-top: 100rpx;
      width: 600rpx;

      & .item {
        display: inline-flex;
        justify-content: center;
        flex: 1;
      }

      & .icon-img {
        width: 120rpx;
        height: 144rpx;
      }
    }

    & .doggerel {
      margin: 40rpx auto 0;
      width: 600rpx;
      text-align: center;

      & .doggerel-title {
        font-size: 30rpx;
      }

      & .doggerel-content {
        font-size: 26rpx;
      }

      & .doggerel-item {
        margin-top: 20rpx;
      }
    }
  }
</style>
