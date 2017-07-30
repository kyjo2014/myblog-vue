<template>
    <div id="postView">
        <article class="post">
            <section class="post-title">
                {{post.title}}
            </section>
            <section class="post-info">
                <mu-flexbox>
    
                    <mu-flexbox-item class="flex post-createDate">
                       {{post.info.createAt}} 
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex post-author">
                        {{post.info.author}}
                    </mu-flexbox-item>
    
                </mu-flexbox>
                <mu-flexbox align="center" justify="center" >
                    <mu-flexbox-item class="flex post-tags" >
                        
                       <mu-badge class="flex post-tag" v-for="i in post.tags"  :key="i" :content="i" />

                    </mu-flexbox-item>
                </mu-flexbox>
            </section>
            <mu-content-block class="post-content">
                {{post.content}}
            </mu-content-block>
        </article>
    
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
            'post'
        ])
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