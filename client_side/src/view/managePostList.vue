<template>
    <div id="postList-view">
        <mu-list class="postList">
            <mu-list-item v-for="i in nowPageposts" :key="i.id" :title="i.title" titleClass="postList-title">
                <span slot="after" class="createAt">{{i.createAt}}</span>
                <div slot="right" class="ctrl-group">
                    <mu-raised-button label="修改" :to="manage-post" class="demo-raised-button" primary/>
                    <mu-raised-button label="删除" :click="deletePost(i.id)" class="demo-raised-button" secondary/>
                </div>
    
            </mu-list-item>
        </mu-list>
        <mu-pagination class="fixed-bottom" :total="totals" :current="pageIdx" @pageChange="getPosts">
        </mu-pagination>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            posts: [
                {
                    title: '123',
                    createAt: '2017 123@'
                }

            ]
        }
    },
    mounted() {
        this.getPosts(1)
    },
    methods: {
        getPosts(pageIdx) {
            this.$store.dispatch('loadPage', pageIdx)
        },
        getPostUrl(id) {
            const baseUrl = `/posts/${id}`
            return baseUrl
        },

    },
    computed: {
        ...mapGetters([
            'posts',
            'pageIdx',
            'total'
        ]),
        nowPagePosts() {
            return this.posts[this.pageIdx]
        }

    }
}
</script>
<style>
.postList-title {
    width: 20px;
}
</style>

<style scoped>
.ctrl-group {
    width: 200px;
}

.fixed-bottom {
    position: fixed;
    bottom: 20px;
    left: 50%;
}
</style>


