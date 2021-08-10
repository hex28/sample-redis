const Crypto = require('crypto')

const randomString = (size = 15) => {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size)
}

module.exports = {
    randomString
}