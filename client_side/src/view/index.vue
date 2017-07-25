<template>
  <div>
    <mu-card v-for="i in data" :key="i.title">
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
  </div>
</template>
<script>
import getResData from '../mixins/getResData'
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.getPosts()

  },
  methods: {
    getPosts() {
      this
        .$http
        .get('./posts')
        .then((res) => {
          this.data = this.getResData(res)
        })
    },
    
  },
  mixins: [getResData]
}

</script>
<style lang="stylus">


</style>
