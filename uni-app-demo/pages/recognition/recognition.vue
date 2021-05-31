<template>
  <view class="page-recognition">
    <view class="preview-box">
      <image
        class="preview-img"
        :src="previewImg"
        mode="aspectFill"
      />
    </view>
    <view v-if="isSuccess" class="info">
      <view class="info-name">
        {{ info.name }}
      </view>
      <view class="info-g">
        属于
      </view>
      <view class="info-type">
        {{ info.type }}
      </view>
    </view>
    <view v-if="isSuccess" class="info-intro">
      {{ info.lajitip }}
    </view>
    <!-- 投放建议 -->
    <view v-if="info.lajitype !== 4 && isSuccess" class="proposal">
      <view class="proposal-title">{{ proposal[info.lajitype].title }}</view>
      <view class="proposal-label">{{ proposal[info.lajitype].label }}</view>
      <view class="proposal-list">
        <view
          v-for="(item, index) in proposal[info.lajitype].list"
          :key="index"
          class="proposal-item"
        >
          <view class="icon-tag"></view>
          <view class="proposal-text">{{ item }}</view>
        </view>
      </view>
    </view>
    <!-- 重新识别 -->
    <view class="foot">
      <view class="btn-reset" @click="hanleSelctorImg">重新识别</view>
    </view>
  </view>
</template>

<script>
  import compressImage from './../../utils/compressImage'
  import { apiImgRecognition } from './../../api/tx'
  import imgToBase64 from './../../utils/imgToBase64'

  export default {
    name: 'Recognition',
    data() {
      return {
        previewImg: '',
        info: {},
        isSuccess: false,
        proposal: [
          {
            title: '可回收物投放要求',
            label: '鼓励居民直接将可回收物纳入再生资源回收系统，如需分类投放应尽量保持清洁干燥，避免污染，轻投轻放。其中：',
            list: [
              '废纸应保持平整，立体包装物应清空内容物，清洁后压扁投放。',
              '废玻璃有尖锐边角的，应包裹后投放。'
            ]
          },
          {
            title: '有害垃圾投放要求',
            label: '有害垃圾投放时，应注意轻放。其中：',
            list: [
              '废旧灯管等易破损的有害垃圾应连带包装或包裹后投放。',
              '废弃药品应连带包装一并投放。',
              '杀虫剂等压力罐装容器，应破孔后投放。',
              '在公共场所产生有害垃圾且未发现对应收集容器时，应将有害垃圾携带至设置有害垃圾收集容器的地点妥善投放。'
            ]
          },
          {
            title: '湿垃圾投放要求',
            label: '湿垃圾应从产生时就与其他品种垃圾分开收集，投放前应尽量沥干，其中：',
            list: [
              '纯流质的食物垃圾，如：牛奶等，应直接倒进下水口。',
              '有包装物的湿垃圾应将包装物去除后分类投放，包装物应投放到对应的可回收物或干垃圾收集容器。',
              '盛放湿垃圾的容器，如：塑料袋等，在投放时应予去除。'
            ]
          },
          {
            title: '干垃圾投放要求',
            label: '凡未列入本目录或成分复杂难以分辨类别的生活垃圾，投入干垃圾收集容器。'
          }
        ]
      }
    },
    onLoad(options) {
      const { previewImg } = options
      this.previewImg = previewImg
      this.uploadImg(previewImg)
    },
    methods: {
      /**
       * 上传图片，调用识别图片的接口
       */
      async uploadImg(img) {
        uni.showLoading({
          title: '正在上传图片',
          mask: true
        })
        // 压缩图片
        const imgPath = await compressImage(img, 50)
        // // 获取图片的信息
        // const info = await getImageInfo(imgPath)
        // console.log(info)
        // // 图片的格式
        // const type = info.type === 'jpeg' ? 'jpg' : 'png'
        // // 图片转为base64
        // const base64 = 'data:image/' + type + ';base64,' + await readFile(imgPath, 'base64')
        const base64 = await imgToBase64(imgPath)
        // console.log('转换成功')
        // console.log(base64)
        uni.showLoading({
          title: '识别图片中',
          mask: true
        })
        // 调用接口，上传图片，识别图片
        const data = await apiImgRecognition(base64)
        const max = this.formatData(data.newslist)
        // console.log(max)
        this.info = max
        uni.hideLoading()
        this.isSuccess = true
      },

      /**
       * 处理接口返回的数据
       */
      formatData(list) {
        // 找到最大的度,返回最相似的结果
        list.sort((a, b) => b.trust - a.trust)
        const max = list[0]
        const type = ['可回收垃圾', '有毒有害垃圾', '厨余或湿垃圾', '其他或干垃圾', '非垃圾物品']
        max.type = type[max.lajitype]
        return max
      },

      /**
       * 选择图片，重新识别
       */
      hanleSelctorImg() {
        uni.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: (res) => {
            const { tempFilePaths } = res
            uni.redirectTo({
              url: '/pages/recognition/recognition?previewImg=' + tempFilePaths[0]
            })
          }
        })
      }

    }
  }
</script>

<style lang="less">
  .page-recognition {
    padding-top: 40rpx;

    & .preview-box {
      display: flex;
      justify-content: center;

      & .preview-img {
        width: 300rpx;
        height: 300rpx;
        border: 1px dashed #999;
      }
    }

    & .info {
      padding-top: 160rpx;
      padding-bottom: 20px;;
      margin: -150rpx auto 0;
      width: 600rpx;
      background: #fff;
    }

    & .info-name {
      font-size: 34rpx;
      color: blue;
      text-align: center;
    }

    & .info-type {
      margin-top: 20rpx;
      font-size: 38rpx;
      color: blue;
      text-align: center;
    }

    & .info-g {
      margin-top: 20rpx;
      font-size: 30rpx;
      text-align: center;
    }

    & .info-intro {
      margin: 40rpx auto 0;
      padding: 40rpx;
      font-size: 26rpx;
      width: 600rpx;
      background: #fff;
      box-sizing: border-box;
    }

    & .foot {
      display: flex;
      justify-content: center;
      margin: 40rpx auto 0;
      width: 600rpx;

      & .btn-reset {
        font-size: 26rpx;
        color: #999;
      }
    }

    & .proposal {
      margin: 40rpx auto 0;
      padding: 40rpx;
      width: 600rpx;
      font-size: 22rpx;
      background: #fff;
      box-sizing: border-box;

      & .proposal-title {
        font-size: 28rpx;
      }

      & .proposal-label {
        margin-top: 20rpx;
        font-size: 26rpx;
      }

      & .proposal-list {
        margin-top: 20rpx;
      }

      & .proposal-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 40rpx;
      }

      & .icon-tag {
        margin-right: 10rpx;
        width: 10rpx;
        height: 10rpx;
        background: #000;
        border-radius: 100%;
      }

      & .proposal-text {
        flex: 1;
      }
    }
  }
</style>
