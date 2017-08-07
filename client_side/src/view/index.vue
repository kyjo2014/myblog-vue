<template>
  <div id="indexView">
    <mu-card v-for="i in nowPagePosts" :key="i.id">
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
    <mu-pagination class="fixed-bottom" :total="totals" :current="pageIdx" @pageChange="getPosts">
    </mu-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import getRamdomColor from '../util/randomColor'
export default {
  data() {
    return {
      totals: 50
    }
  },
  mounted() {
    this.getPosts(1)
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
    }
  },
  beforeRouteLeave: (to, from, next) => {
    next()
  }
}

</script>
<style scoped>
#indexView {
  padding-bottom: 30px;
}

.tags {
  margin: 0 5px;
}

.fixed-bottom {
  position: fixed;
  bottom: 20px;
  left: 50%;
}
</style>
