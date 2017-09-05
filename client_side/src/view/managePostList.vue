<template>
    <div id="postsList-view">
        <div class="tools">
            <reloadPost class="right"></reloadPost>
        </div>
        <mu-list class="postsList">
            <mu-list-item v-for="i in nowPagePosts" :key="i.id" :title="i.title">

                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                    <mu-menu-item title="删除" @click="rmPost(i.id)" />
                    <mu-menu-item title="修改" :to="{ name: 'manage-post', params: { postId: i.id }}" />
                </mu-icon-menu>
            </mu-list-item>

        </mu-list>
        <mu-pagination class="fixed-bottom" :total="total" :current="pageIdx" @pageChange="getPosts">
        </mu-pagination>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import reloadPost from '../components/reLoadPost'
export default {
    data() {
        return {
            leftTop: { horizontal: 'left', vertical: 'top' },
            leftBottom: { horizontal: 'left', vertical: 'bottom' },
            rightBottom: { horizontal: 'right', vertical: 'bottom' },
            rightTop: { horizontal: 'right', vertical: 'top' },
            pageIdx: 1
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
        },
        getPosts() {

        },


    },
    components: {
        reloadPost
    },
    mounted() {
        this.getPosts()
    }

}
</script>
<style>
.postList-title {
    width: 20px;
}
</style>

<style scoped>
.tools {
    display: flex;
    justify-content: flex-end;
}
.right {
     align-self: flex-end;
}
.ctrl-group {
    width: 200px;
}

.fixed-bottom {
    position: fixed;
    bottom: 20px;
    left: 50%;
}
</style>


