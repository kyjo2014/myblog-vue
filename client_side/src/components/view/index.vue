<template>
  <div>
    <mu-card v-for="i in data" :key="i">
      <mu-card-header class="post-title" :title="i.title" :sub-title="i.createAt">
      </mu-card-header>
      <mu-card-text>
        {{i.summary}}
      </mu-card-text>
      <mu-card-actions class="btn-rg">
        <mu-flat-button label="阅读文章" v-on:click="goto(i.id)"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [{
        title: '123',
        content: '456'
      }]
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {

  },
  methods: {
    fetchData() {
      this.$http.get('http://localhost:3000/posts').then((res) => {
        if (res.status == '200' && res.data.code == '200') {
          let data = res.data.data
          this.data = data.map(this.convertData)
        }
      })

    },
    convertData(post) {

      return {
        title: post.title,
        summary: post.summary,
        id: post.id,
        createAt: post.createAt
      }
    },
    goto(id) {
      this.$router.push(`/posts/${id}`)
    },
    postUrl(id) {
      return `/posts/${id}`
    }
  }
}

</script>
<style lang="stylus">
   .mu-card-header-title .mu-card-title.mu-card-title {
     font-size:34px;
   } 
   .btn-rg {
     text-align :right;
   }

</style>
