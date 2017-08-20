module.exports = function (target, nid) {
    return Buffer.concat([target.slice(0, 10), nid.slice(10)]);
}