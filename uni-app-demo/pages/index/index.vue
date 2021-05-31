<template>
  <view class="page-index">
    <swiper
      class="banner"
      :indicator-dots="banneroptions.indicatorDots"
      :autoplay="banneroptions.autoplay"
      :interval="banneroptions.interval"
      :circular="banneroptions.circular"
    >
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <view class="banner-item">
          <image class="banner-img" :src="item" />
        </view>
      </swiper-item>
    </swiper>

    <view class="content">
      <view class="icon">
        <image
          class="icon-lj"
          src="/static/icon-lj.png"
          @click="handleSelectorImg"
        />
      </view>
      <view class="title">
        <text>拍一拍</text>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <view class="contact">
        <button
          class="btn-contact"
          open-type="contact"
        >问一问</button>
      </view>
      <!-- #endif -->
      <view class="fn-list">
        <!-- @click="navigateTo('/pages/wenda/wenda')" -->
        <view class="fn-item">
          <image class="fn-icon" src="/static/icon-wenda.png" />
          <view class="fn-title">
            <text>知识问答</text>
          </view>
        </view>

        <view class="fn-item" @click="navigateTo('/pages/changshi/changshi')">
          <image class="fn-icon" src="/static/icon-changshi.png" />
          <view class="fn-title">
            <text>记忆口诀</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        bannerList: ['/static/1.jpg', '/static/2.jpg', '/static/3.jpg'],
        banneroptions: {
          indicatorDots: true, // 是否显示指示点
          autoplay: true, // 是否自动播放
          interval: 1500, // 间隔时间
          circular: true // 是否衔接播放
        }
      }
    },
    onLoad() {

    },
    methods: {
      /**
       * 选择图片
       */
      handleSelectorImg() {
        uni.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: (res) => {
            const { tempFilePaths } = res
            // console.log(tempFilePaths)
            uni.navigateTo({
              url: '/pages/recognition/recognition?previewImg=' + tempFilePaths[0]
            })
          }
        })
      },

      /**
       * 跳转导航
       */
      navigateTo(url) {
        // console.log(url)
        uni.navigateTo({ url })
      }
    }
  }
</script>

<style lang="less">
  .banner {
    height: 210rpx;

    & .banner-item {
      height: 210rpx;
    }

    & .banner-img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    margin-top: 140rpx;

    & .title {
      margin-top: 20px;
      text-align: center;
    }

    & .icon {
      display: flex;
      justify-content: center;

      & .icon-lj {
        width: 120rpx;
        height: 120rpx;
      }
    }

    & .contact {
      margin-top: 100rpx;

      & .btn-contact {
        width: 300rpx;
        font-size: 26rpx;
        background: #CFEAFF;
        color: #fff;
      }

      & .btn-contact:after {
        display: none;
      }
    }
  }

  .fn-list {
    display: flex;
    justify-content: space-around;
    margin: 40rpx auto 0;
    width: 400rpx;

    & .fn-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    & .fn-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 100%;
    }

    & .fn-title {
      margin-top: 20rpx;
      font-size: 26rpx;
    }
  }
</style>
