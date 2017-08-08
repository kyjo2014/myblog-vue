<template>
    <div id="postInfo">
    
        <div class="tags">
            <h3>标签</h3>
            <mu-flexbox align="center" justify="center">
                <mu-flexbox-item class="flex post-tags">
                    <mu-badge class="flex post-tag" v-for="i in tags" :key="i.tid" :content="i.name" :color="getColor(i.name)" />
                </mu-flexbox-item>
            </mu-flexbox>
        </div>
        <div class="summary">
            <h3>简介</h3>
            {{summary}}
        </div>
        <div class="author">
            <h3>作者</h3>
            <mu-flexbox-item class="flex post-author">
                {{author}}
            </mu-flexbox-item>
        </div>
        <div class="createAt">
            <h3>创建时间</h3>
            <mu-flexbox-item class="flex post-createDate">
                {{createAt}}
            </mu-flexbox-item>
    
        </div>
        <div class="updateAt">
            <h3>更新时间</h3>
            {{updateAt}}
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import getRandomColor from '../util/randomColor'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'post'
        ]),
        author() {
            return this.post.author
        },
        createAt() {
            return this.post.createAt
        },
        updateAt() {
            return this.post.updatedAt
        },
        tags() {
            return this.post.tags
        },
        summary() {
            return this.post.summary
        }
    },
    methods: {
        getColor(name) {
            return getRandomColor(name)
        }
    }
}
</script>
<style scoped>
#postInfo {
    overflow: hidden;
    text-align: center;
}
</style>

