const { Jimp } = require('jimp')
const jsQR = require('jsqr')

module.exports = on => {
  on('task', {
    decodeQRFromBase64(base64) {
      return (async () => {
        const buffer = Buffer.from(base64, 'base64')
        const image = await Jimp.read(buffer)
        const imageData = {
          data: new Uint8ClampedArray(image.bitmap.data),
          width: image.bitmap.width,
          height: image.bitmap.height
        }
        const decoded = jsQR(imageData.data, imageData.width, imageData.height)
        return decoded ? decoded.data : null
      })()
    }
  })
}
