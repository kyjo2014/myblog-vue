<template>
  <div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="首页" href="/#/index" />
      <mu-tab value="tab2" title="书籍" href='/#/books' />
      <mu-tab value="tab3" title="管理" href="/#/manage" />
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
       
    </div>
    <div v-if="activeTab === 'tab2'">
      <h2>Tab Two</h2>
      <p>
        这是第二个 tab
      </p>
    </div>
    <div v-if="activeTab === 'tab3'">
      <h2>Tab Three</h2>
      <p>
        这是第三个 tab
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val
    },
    handleActive() {
      window.alert('tab active')
    }
  }
}

</script>
<style lang='stylus'>


</style>
