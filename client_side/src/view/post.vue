<template>
    <div id="postView">
        <article class="post">
            <section class="post-title">
                {{post.title}}
            </section>
            <section class="post-content">
                <mu-content-block class="post-content" v-html="content">
                </mu-content-block>
            </section>
    
        </article>
    
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import md2HTML from '../util/md2HTML.js'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'post'
        ]),
        content() {
            return md2HTML(this.post.content)
        }
        
    },
    mounted() {
        this.fetchData(this.$route.params.id)
    },
    methods: {
        fetchData(postId) {
            this.$store.dispatch('fetchPost', postId)
        }
    }

}
</script>
<style scope>
.post {
    background-color: white;
}

.flex {
    text-align: center;
}

.post-title {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
}

.post-tags {
    text-align: center;
}

.post-tag {

    margin: 10px;
    min-width: 30px;
}
</style>