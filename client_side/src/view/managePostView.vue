<template>
    <div class="manage-post">
        <mu-flexbox class="title">
            <mu-select-field v-model="game" class="main-sort">
                <mu-menu-item value="1" title="原创" />
                <mu-menu-item value="2" title="转载" />
                <mu-menu-item value="3" title="翻译" />
            </mu-select-field>
            <mu-text-field hintText="标题" v-model="title" />
        </mu-flexbox>
        <postContent @updatePost="updateContent" :post="prevpost"></postContent>
    
        <mu-flexbox class="tag" orient="vertical">
            <mu-flexbox-item order="0" class="flex-demo">
                <mu-text-field hintText="标签" helpText="标签以逗号分隔" full-width v-model="tags" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="sort">
            <mu-flexbox-item order="0" class="flex-demo">
                <h2>种类</h2>
                <mu-radio label="前端" class="demo-checkbox" />
                <mu-radio v-for=" i in sorts" :key="i.sid" :label="i.name" class="demo-checkbox" />
                <mu-float-button icon="add" mini class="add-sort" @click="addSortpop" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="summary">
            <mu-text-field label="简介" labelFloat multi-line :rows="4" full-width v-model="summary" />
        </mu-flexbox>
        <mu-flexbox class="ctrl">
            <mu-flexbox-item order="0" class="flex">
    
            </mu-flexbox-item>
            <mu-flexbox-item order="0" class="flex">
                <mu-raised-button label="上传" @click="upload" class="demo-raised-button" />
                <mu-raised-button label="保存" @click="save" class="demo-raised-button" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-dialog :open="dialog" title="新增种类" @close="close">
            <mu-text-field hintText="种类" v-model="newSort" />
            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="addSort" label="确定" />
        </mu-dialog>
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
            dialog: false,
            post: {
                title: '',
                content: '',
                tags: [],
                sort: '',
                summary: ''
            },
            prevpost: '',
            newSort: '',
            sorts: []
        }
    },
    mounted() {
        let postId = this.$route.params.id
        if (postId) {
            this.$store.dispatch('fetchPost', postId)
        } else {
            this.$http.get('/sort').then((res) => {
                if (res.data.code == '200') {
                    this.sorts = res.data.data
                }
            }, (err) => {
                console.log(err)
            })
        }
    },
    methods: {
        //TODO：草稿箱 
        addSortpop() {
            this.dialog = true
        },
        updateContent(a) {
            this.content = a
        },
        upload() {
            this.$http.post('/posts',
                this.post
            ).then((res) => {
                if (res.data.code == 200) {
                    console.log('success')
                }
            }, (err) => {

            })
        },
        save() {
            this.$store.commit('saveDrafts')
        },
        close() {
            this.dialog = false
        },
        addSort() {
            this.$http.post('/sort', {
                sort: this.newSort
            }).then((res) => {
                if (res.data.code == '200') {
                    this.sorts = res.data.data
                }

            }, (err) => {
                console.log(err)
            })
        }
    },
    components: {
        postContent
    },
    computed: {
        ...mapGetters([
            'posts'
        ]),
        title: {
            set(val) {
                this.post.title = val
            },
            get() {
                return this.post.title
            }
        },
        content: {
            set(val) {
                this.post.content = val
                this.$store.commit('updatePost', {
                    content: val
                })
            },
            get() {
                return this.posts.content
            }
        },
        tags: {
            set(val) {
                this.post.tags = val.length > 0 ? val.split(',') : []
            },
            get() {
                return this.post.tags.join(',')
            }
        },
        sort: {
            set(val) {
                this.post.sort = val
            },
            get() {
                return this.psot.sort
            }
        },
        summary: {
            set(val) {
                if (typeof val == 'string' && val.length < 30) {
                    this.post.summary = val
                } else {
                    console.warn('summary should less then 30 word')
                }

            },
            get() {
                return this.post.summary
            }
        }
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


