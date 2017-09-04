<template>
    <div id="manageSideBar-view">
        <mu-menu desktop>
            <mu-menu-item title="文章管理"   disabled/>
            <mu-menu-item title="发表文章" to="posts"  @click="toPosts" inset/>
            <mu-menu-item title="修改文章" to="postsList" @click="toPostsList" inset/>
            <mu-divider />
            <mu-menu-item title="游客管理" to="users" disabled/>
            <mu-menu-item title="游客列表" to="users" inset/>
            <mu-divider />
            <mu-menu-item title="书本管理" to="books" disabled />

        </mu-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            posts: 'posts',
            postsList: 'postsList'
        }
    },
    methods : {
        toPostsList () {
            this.$router.push('postsList')
        },
        toPosts () {
            this.$router.push('posts')
        }
    }
}
</script>
<style scoped>
#manageSideBar-view {
    width: 100%;
    overflow: hidden;
}
</style>


