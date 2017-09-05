<template>
  <div id="indexView">
    <div class="tools">
      <input type="text" class="post-search" v-model.lazy="search">
      <reloadPost class="right"></reloadPost>
    </div>
    <div class="content">
      <mu-card class="listItem" v-for="i in nowPagePosts" :key="i.id">
        <mu-card-header :title="i.title" :subTitle="i.createAt">
          标题
        </mu-card-header>
        <mu-card-text>
          摘要{{i.summary}}
        </mu-card-text>
        <mu-card-actions>

          <mu-flexbox>
            <mu-flexbox-item class="flex-demo">
              <mu-badge class="tags" v-for="j in i.tags" :key="j.tid" :content="j.name" :color="getTagColor(j.name)" />

            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">

            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <router-link :to="getPostUrl(i.id)">阅读文章</router-link>
            </mu-flexbox-item>
          </mu-flexbox>

        </mu-card-actions>
      </mu-card>
    </div>

    <mu-pagination class="fixed-bottom" :total="totals" :current="pageIdx" @pageChange="getPosts">
    </mu-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import getRamdomColor from '../util/randomColor'
import reloadPost from '../components/reLoadPost'
export default {
  data() {
    return {
      totals: 5,
      search: ''
    }
  },
  mounted() {
    this.getPosts(1)
  },
  watch: {
    search(val) {
      this.$store.dispatch('fetchByQuery', val)
    }
  },
  computed: {

  },
  methods: {
    getTagColor(name) {

      return getRamdomColor(name)

    },
    getPosts(pageIdx) {

      this.$store.dispatch('loadPage', pageIdx)
    },
    getPostUrl(id) {
      const baseUrl = `/posts/${id}`
      return baseUrl
    }
  },

  computed: {
    ...mapGetters([
      'posts',
      'pageIdx',
      'total'
    ]),
    nowPagePosts(a) {
      return this.posts[this.pageIdx]
    },
    totalPage() {
      return 10
    }
  },
  beforeRouteLeave: (to, from, next) => {
    next()
  },
  components: {
    reloadPost
  }
}

</script>
<style scoped>
#indexView {
  position: relative;
  padding-top: 61px;
  padding-bottom: 30px;
  overflow: auto;
}

.tools {
  position: absolute;
  width: 100%;
  height: 50px;
  border-bottom: 1px dashed lightgray;
  top: 0px;
  display: flex;
  align-items: center;
}

.content {
  height: 100%;
  overflow: auto;
}

.tags {
  margin: 0 5px;
}


.post-search {
  border: 1px solid gray;
  padding: 0 10px;
  border-radius: 15px;
  position: absolute;
  right: 60px;
  outline: 0px;
}

.fixed-bottom {
  position: fixed;
  bottom: 20px;
  left: 50%;
}

.listItem {
  margin-bottom: 10px;
}
</style>
