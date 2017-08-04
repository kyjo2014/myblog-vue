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
        <postContent @updatePost="updateContent" :post="prevpost"></postContent>
    
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
            <mu-text-field label="简介" labelFloat multi-line :rows="4" full-width v-model="post" />
        </mu-flexbox>
        <mu-flexbox class="ctrl">
            <mu-flexbox-item order="0" class="flex">
    
            </mu-flexbox-item>
            <mu-flexbox-item order="0" class="flex">
                <mu-raised-button label="上传" @click="upload" class="demo-raised-button" />
                <mu-raised-button label="保存" @click="save" class="demo-raised-button" />
            </mu-flexbox-item>
        </mu-flexbox>
    </div>
</template>
<script>
import postContent from '../components/md2HTML.vue'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            game: 2,
            row: 300,
            post: '',
            prevpost: ''
        }
    },
    mounted() {
        let postId = this.$route.params.id
        if (postId) {
            this.$store.dispatch('fetchPost', postId)
        }
    },
    methods: {
        //TODO：草稿箱   
        updateContent(a) {
            this.$store.commit('updatePost', {
                content: a
            })
        },
        upload() {
            this.$http.post('', {
                post
            }).then((res) => {
                if (res.data.code == 200) {
                    console.log('success')
                }
            }, (err) => {

            })
        },
        save() {
            this.$store.commit('saveDrafts')
        }
    },
    components: {
        postContent
    },
    computed: {
        ...mapGetters([
            'posts'
        ])
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
    text-align: center;
}


.image {
    margin-top: 5px;
    border: 1px dashed red;
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


