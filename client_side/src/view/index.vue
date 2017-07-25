<template>
  <div>
    <mu-card v-for="i in nowPagePosts" :key="i.title">
      <mu-card-header :title="i.title" :subTitle="i.createAt">
  
      </mu-card-header>
      <mu-card-text>
        {{i.summary}}
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button label="Action 1" />
        <mu-flat-button label="Action 2" />
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
      console.log('wtf')
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
