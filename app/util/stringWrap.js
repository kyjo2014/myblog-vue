module.exports = function (string) {
    if (typeof string == 'string') {
       return String.prototype.concat('\"',string,'\"') 
    }
    return string
}