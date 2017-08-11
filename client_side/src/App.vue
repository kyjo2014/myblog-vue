<template>
  <div id="app">
  
    <div class="header">
      <div class="logo">Lee's Blog</div>
      <div class="nav">
        <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
          <mu-tab value="index" title="首页" />
          <mu-tab value="posts" title="文章" />
          <mu-tab v-if="isHost" value="manage" title="管理" />
        </mu-tabs>
      </div>
      <mu-icon-menu icon="more_vert" :anchorOrigin="leftTop" :targetOrigin="leftTop" class="selected" slot="right">
        <mu-menu-item title="登录" @click="openLogin" />
      </mu-icon-menu>
    </div>
    <div class="content">
      <div class="content-left">
        <transition>
          <router-view class="view" name="sideBar"></router-view>
        </transition>
      </div>
      <div class="content-right">
        <transition>
          <router-view class="view" name="content"></router-view>
        </transition>
      </div>
    </div>
    <login :show="isOpen" @close="closeLogin"></login>
  </div>
</template>

<script>
import Navbar from './components/navbar'
import login from './components/login'
import { mapGetters } from 'vuex'
export default {

  name: 'app',
  components: {
    Navbar,
    login
  },
  data() {
    return {
      leftTop: { horizontal: 'left', vertical: 'bottom' },
      activeList: 'list1',
    }
  },
  computed: {
    activeTab() {
      return this.$route.name.slice(0, 6)
    },
    route() {
      return 0
    },
    isHost() {
      return this.$store.state.isHost
    },
    ...mapGetters([
      'isOpen',
      'isHost'
    ])
  },

  mounted() {
    // this.activeTab = this.$route.name.slice(0, 6)
  },
  methods: {
    handleTabChange(val) {
      this.$router.push({ name: val, params: { id: 1 } })
    },
    handleListChange(val) {
      this.activeList = val
    },
    openLogin() {
      this.$store.commit('open')
    },
    closeLogin() {
      this.$store.commit('close')
    }

  },

  mixins: []
}

</script>



<style>
* {
  box-sizing: border-box;
}

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
  overflow: hidden;
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
  width: calc(100% - 300px);
  margin: 0 auto;
}

.selected {
  color: white;
  vertical-align: middle;
}

.tab {
  margin: 0 auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0);
}

.content {
  overflow: hidden;
  margin: 10px auto;
  height: calc(100% - 75px);
  max-width: 1280px;
}

.content-left {
  width: 30%;
  display: inline-block;
  vertical-align: top;
  height: 100%;
}

.content-right {
  width: 70%;
  /* margin: 10px 0 ; */
  margin-left: -10px;
  padding: 0 0 0 10px;
  display: inline-block;

  background-color: rgba(0, 0, 0, 0);
  overflow: auto;
  height: 100%;
  position: relative;
}

.view {
  background-color: white;
  height: 100%;
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
