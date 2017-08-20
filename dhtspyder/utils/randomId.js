const crypto = require('crypto')
module.exports = function () {
    return crypto.createHash('sha1').update(crypto.randomBytes(20)).digest();
};