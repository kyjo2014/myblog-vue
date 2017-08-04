<template>
    <div class="md2HTML">
        <mu-flexbox class="content">
            <mu-flexbox-item class="input">
                <mu-text-field class="input-content" inputClass="input-content" hintText="多行文本输入，默认 3行，最大6行" :underlineShow="false" :full-width="true" multiLine :rows="20" :rowsMax="20" v-model.lazy="post" />
            </mu-flexbox-item>
            <mu-flexbox-item class="preview">
                <mu-content-block v-html="rawHTML" class="preview-content">
                </mu-content-block>
            </mu-flexbox-item>
        </mu-flexbox>
    </div>
</template>
<script>
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
export default {
    data() {
        return {
            post: ''
        }
    },
    computed: {
        rawHTML() {
            var converter = md2HTMLConverter()
            return converter(this.post)
        }
    },
    watch: {
        post(content) {
            this.$emit('updatePost', content)
        }
    },
    props: 'post'
}
</script>
<style scoped>
.input {
    border: 1px dashed blue;
    height: 512px;
}

.input-content {
    height: 100%!important;
}

.preview {
    border: 1px dashed green;
    height: 512px;
}

.preview-content {
    height: 100%;
}
</style>


