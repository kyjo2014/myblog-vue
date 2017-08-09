<template>
    <div id="postsList-view">
        <mu-list class="postsList">
            <mu-list-item v-for="i in posts" :key="i.id" title="All mail">
                <mu-icon-menu icon="more_vert" :anchorOrigin="leftTop" :targetOrigin="rightBottom">
                    <mu-menu-item title="删除" @click="rmPost(i.id)" />
                    <mu-menu-item title="修改" :to="{ name: 'manage-post', params: { postId: i.id }}" />
                </mu-icon-menu>
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
          
        }
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
    },
    methods: {
        rmPost(postid) {
            this.$store.dispatch('rmPost', postid)
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


