export default function(src, quality = 80) {
  return new Promise((resolve, reject) => {
    uni.compressImage({
      src,
      quality,
      success: res => {
        console.log(res.tempFilePath)
        resolve(res.tempFilePath)
      },
      fail: () => reject()
    })
  })
}
