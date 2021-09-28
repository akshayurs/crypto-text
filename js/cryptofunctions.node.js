const crypto = require('crypto')

//Function to encrypt Message and return "encryptedMessage+IV"
//input ('Message','password')
//return "encrypted message + IV"
global.encrypt = function (msg, password) {
  let iv = crypto.randomBytes(16)
  let hashedPassword = crypto.createHash('md5').update(password).digest('hex')
  let cipher = crypto.createCipheriv('aes-256-cbc', hashedPassword, iv)
  let encryptedData = cipher.update(msg, 'utf8', 'hex')
  encryptedData += cipher.final('hex')

  return encryptedData + iv.toString('hex')
}

//Function to decrypt Message and return Decrypted message
//input ('encryptedMessage+IV','password')
//return object
// { success : true|false ,data : "decrypted message"}
global.decrypt = function (data, password) {
  let encryptedMsg = data.substr(0, data.length - 32)
  let iv = data.substr(-32)
  try {
    let hashedPassword = crypto.createHash('md5').update(password).digest('hex')
    let cipher = crypto.createDecipheriv(
      'aes-256-cbc',
      hashedPassword,
      Buffer.from(iv, 'hex')
    )
    let decryptedData = cipher.update(encryptedMsg, 'hex', 'utf8')
    decryptedData += cipher.final('utf8')
    return {
      success: true,
      data: decryptedData,
    }
  } catch (error) {
    console.log('Password incorrect')
    return {
      success: false,
    }
  }
}
