<template>
    <div id="postInfo">
        <div class="tags">
            <mu-flexbox align="center" justify="center">
                <mu-flexbox-item class="flex post-tags">
                    <mu-badge class="flex post-tag" v-for="i in tags" :key="i.tid" :content="i.name" />
                </mu-flexbox-item>
            </mu-flexbox>
        </div>
        <div class="summary">
    
        </div>
        <div class="author">
            <mu-flexbox-item class="flex post-author">
                {{author}}
            </mu-flexbox-item>
        </div>
        <div class="createAt">
            <mu-flexbox-item class="flex post-createDate">
                {{createAt}}
            </mu-flexbox-item>
    
        </div>
        <div class="updateAt">
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
            return this.post.updateAt
        },
        tags() {
            return this.post.tags
        }
    }
}
</script>
<style>

</style>

