<template>
    <div class="manage-post">
        <mu-flexbox class="title">
            <mu-select-field v-model="game" class="main-sort">
                <mu-menu-item value="1" title="原创" />
                <mu-menu-item value="2" title="转载" />
                <mu-menu-item value="3" title="翻译" />
            </mu-select-field>
            <mu-text-field hintText="标题" />
        </mu-flexbox>
        <mu-flexbox class="content">
            <mu-flexbox-item class="input">
                <mu-text-field class="input-content" inputClass="input-content" hintText="多行文本输入，默认 3行，最大6行" :underlineShow="false" :full-width="true" multiLine :rows="20" :rowsMax="20" v-model="post" />
            </mu-flexbox-item>
            <mu-flexbox-item class="preview">
                <mu-content-block v-html="rawHTML" class="preview-content">
                </mu-content-block>
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="image">
            <mu-flexbox-item order="0" class="flex-demo">
                <mu-float-button icon="add" class="demo-float-button">
    
                </mu-float-button>
    
            </mu-flexbox-item>
            <mu-flexbox-item order="2" span="200" class="flex-demo">
                <mu-grid-list class="gridlist-inline-demo">
                    <!-- <mu-grid-tile v-for="tile, index in list" :key="index">
                                                                                    <img :src="tile.image" />
                                                                                    <span slot="title">{{tile.title}}</span>
                                                                                    <span slot="subTitle">by
                                                                                        <b>{{tile.author}}</b>
                                                                                    </span>
                                                                                    <mu-icon-button icon="star_border" slot="action" />
                                                                                </mu-grid-tile> -->
                </mu-grid-list>
            </mu-flexbox-item>
    
        </mu-flexbox>
        <mu-flexbox class="tag" orient="vertical">
            <mu-flexbox-item order="0" class="flex-demo">
                <mu-text-field hintText="标签" helpText="标签以逗号分隔" full-width v-model="post" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="sort">
            <mu-flexbox-item order="0" class="flex-demo">
                <h2>种类</h2>
                <mu-checkbox label="最简单的" class="demo-checkbox" />
                <mu-checkbox label="最简单的" class="demo-checkbox" />
                <mu-checkbox label="最简单的" class="demo-checkbox" />
                <mu-checkbox label="最简单的" class="demo-checkbox" />
                <mu-float-button icon="add" mini class="add-sort" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="summary">
            <mu-text-field label="简介" labelFloat  multi-line :rows="4" full-width v-model="post" />
        </mu-flexbox>
        <mu-flexbox class="ctrl">
            <mu-flexbox-item order="0" class="flex">
    
            </mu-flexbox-item>
            <mu-flexbox-item order="0" class="flex">
                <mu-raised-button label="上传" class="demo-raised-button" />
                <mu-raised-button label="保存" class="demo-raised-button" />
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
            game: 2,
            row: 300,
            post: ''

        }
    },
    mounted() {

    },
    computed: {
        rawHTML() {
            var converter = md2HTMLConverter()
            return converter(this.post)
        }
    }
}
</script>
<style>
.input-content {
    height: 512px!important;
}
</style>

<style scoped>
.main-sort.main-sort {
    width: 100px;
    margin-right: 10px;
}

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

.image {
    border: 1px dashed yellow;
    min-height: 150px;
    padding: 10px;
}

.add-sort {
    width: 25px;
    height: 25px;
}

.ctrl .flex {
    text-align: center;
}
</style>


