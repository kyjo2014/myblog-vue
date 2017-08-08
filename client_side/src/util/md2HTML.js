import showdown from '../../static/showdown.min.js'

/**
 * @description
 * 生成一个md转换为html的转换器
 *
 * @param {any} opt
 * @returns
 */
function md2HTMLConverter(opt) {
    var converter = new showdown.Converter(opt);
    return function (text) {
        return converter.makeHtml(text);
    }
}

export default md2HTMLConverter()