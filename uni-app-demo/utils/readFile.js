export default function(filePath, encoding = 'ArrayBuffer') {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath,
      encoding,
      success: (res) => resolve(res.data),
      fail: () => reject()
    })
  })
}
