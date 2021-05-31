// #ifdef MP-WEIXIN
import readFile from './readFile'
import getImageInfo from './getImageInfo'
// #endif

// #ifdef APP-PLUS
/**
 * 将图片转为base64编码格式
 * @param  {String || Object File}   file 图片的src地址或Object File对象
 */
function appImgToBase64(file) {
  return new Promise((resolve, reject) => {
    const bitmap = new plus.nativeObj.Bitmap()
    bitmap.load(file, function(res) {
      const base64 = bitmap.toBase64Data()
      resolve(base64)
    }, function(err) {
      reject(err)
    })
  })
}
// #endif

export default async function(file) {

  // #ifdef MP-WEIXIN
    // 获取图片的信息
    const info = await getImageInfo(file)
    // 图片的格式
    const type = info.type === 'jpeg' ? 'jpg' : 'png'
    const base64 = 'data:image/' + type + ';base64,' + await readFile(file, 'base64')
  // #endif

  // #ifdef APP-PLUS
    const base64 = await appImgToBase64(file)
  // #endif
  return base64
}
