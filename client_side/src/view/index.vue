<template>
  <div>
    <mu-card v-for="i in nowPagePosts" :key="i.title">
      <mu-card-header :title="i.title" :subTitle="i.createAt">
        标题
      </mu-card-header>
      <mu-card-text>
        摘要{{i.summary}}
      </mu-card-text>
      <mu-card-actions>
  
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo">
            <mu-chip class="demo-chip">
              种类
            </mu-chip>
          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo">
  
          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo">
            <mu-flat-button label="阅读文章"  primary/>
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
export default {
  data() {
    return {
      totals: 50
    }
  },
  mounted() {
    this.getPosts(1)
  },
  methods: {
    getPosts(pageIdx) {
      this.$store.dispatch('loadPage', pageIdx)
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
  }
}

</script>
<style scoped>
.fixed-bottom {
  position: fixed;
}
</style>
