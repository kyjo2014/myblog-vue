<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Aside></Aside>
    <!--<Toaste></Toaste>-->
  </div>
</template>

<script>
  import Navbar from './components/navbar'
  export default {
    name: 'app',
    components: {
      Navbar
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 1280px;
    margin: 0 auto;
  }

</style>
