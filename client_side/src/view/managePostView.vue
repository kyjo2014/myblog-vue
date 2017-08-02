<template>
    <div class="manage-post">
        <mu-flexbox class="title">
            <mu-flexbox-item class="flex-demo">
                <mu-select-field v-model="game" label="多个">
                    <mu-menu-item value="1" title="阴阳师" />
                    <mu-menu-item value="2" title="影之刃" />
                    <mu-menu-item value="3" title="天下HD" />
                    <mu-menu-item value="4" title="穿越火线" />
                    <mu-menu-item value="5" title="英雄联盟" />
                    <mu-menu-item value="6" title="王者荣耀" />
                </mu-select-field>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
                <mu-text-field hintText="提示文字" />
                <br/>
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="content">
            <mu-flexbox-item class="flex-demo">
                <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="20" :rowsMax="6" v-model="post" />
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
                <mu-content-block>
                    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                    {{post | md2HTML }}
                </mu-content-block>
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="image">
            <mu-flexbox-item order="0" class="flex-demo">
                6
            </mu-flexbox-item>
            <mu-flexbox-item order="2" span="200" class="flex-demo">
                7
            </mu-flexbox-item>
            <mu-flexbox-item order="1" class="flex-demo">
                8
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="tag" orient="vertical">
            <mu-flexbox-item order="0" class="flex-demo">
                9
            </mu-flexbox-item>
            <mu-flexbox-item order="2" class="flex-demo">
                10
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="sort">
    
        </mu-flexbox>
        <mu-flexbox class="summary">
    
        </mu-flexbox>
        <mu-flexbox class="ctrl">
    
        </mu-flexbox>
    </div>
</template>
<script>
export default {    
    data() {
        return {
            game: 0,
            row: 300,
            post: ''
        }
    },
    mounted () {
    },
}
</script>
<style>

</style>


