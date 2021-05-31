/**
 * 图片识别
 * @param {String} base64 图片的base64
 */
export function apiImgRecognition(base64) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'https://api.tianapi.com/txapi/imglajifenlei/index',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        key: '09237a7a55a53f2a2a700c652083c960',
        img: base64
      },
      success: function(res) {
        console.log(res)
        resolve(res.data)
      },
      fail: reject
    })
  })
}
