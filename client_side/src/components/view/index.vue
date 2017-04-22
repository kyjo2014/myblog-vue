<template>
  <div>
    this is indexView
    <mu-card v-for="i in data" :key="i">
      <mu-card-header title="Myron Avatar" subTitle="sub title">
       {{i.title}}
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
      this.$http.get('http://localhost:3000/posts').then((res) => {
        this.data = res.data
      })

    }
  }

</script>
<style lang="stylus">


</style>
