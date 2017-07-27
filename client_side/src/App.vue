<template>
  <div id="app">
    <!-- <Navbar></Navbar>
                          <router-view></router-view>
                          <Aside></Aside>
                          <Toaste></Toaste> -->
    <div class="header">
      <div class="logo">1235</div>
      <div class="nav">
        <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
          <mu-tab value="tab1" title="test1" />
          <mu-tab value="tab2" title="test2" />
          <mu-tab value="tab3" title="test3" />
        </mu-tabs>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <router-view class="view" name="sideBar"></router-view>
      </div>
      <div class="content-right">
        <router-view class="view" name="content"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      activeTab: 'tab1',
      activeList: 'list1'
    }
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val
    },
    handleListChange(val) {
      this.activeList = val
    }
  },
  mixins: []
}

</script>



<style>
html,
body {
  height: 100%;
  overflow-x: auto!important;
}
</style>
<style scoped>
#app {
  background-color: rgb(236, 236, 236);
  min-width: 1280px;
  height: 100%;
}

.header {
  background-color: #7e57c2;
}

.logo {
  font-size: 24px;
  color: white;
  display: inline-block;
  padding: 10px 20px;
}

.nav {
  display: inline-block;
  width: calc(100% - 150px);
  margin: 0 auto;
}

.tab {
  margin: 0 auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0);
}

.content {
  overflow: hidden;
  height: calc(100% - 56px);
  max-width: 1280px;
  margin: 0 auto;
}

.content-left {
  width: 30%;
  float: left;
  background-color: white;
  margin-bottom: -4000px;
  padding-bottom: 4000px;
}

.content-right {
  width: 70%;
  display: inline-block;
  float: right;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0);
  overflow: auto;
  margin-bottom: -4000px;
  padding-bottom: 4000px;
  position: relative;
}

.breadcrumb {
  margin: 10px 0;
}

.body {
  background-color: white;
  border-radius: 5px;
  min-height: 500px;
}

.footer {
  padding: 20px 0;
  text-align: center;
}
</style>
