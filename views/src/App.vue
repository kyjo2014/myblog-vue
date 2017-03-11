<template>
  <div id="app">
    <h1>博客后台管理系统</h1>
    <hello></hello>
    <div class="login" v-if="show">
        <input type="text" id="loginName" v-model="id" placeholder="ID"> 
        <input type="text" id="loginPwd" v-model="pwd" placeholder="password">
        <div class="btn" @click="login()">
          登录
        </div>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  data() {
    return {
      show: true,
      id: null,
      pwd:null
    }
  },
  components: {
    Hello
  },
  methods:{
    login() {
      this.$http.post('http://localhost:3000/login',{
        id: this.id,
        pwd: this.pwd
      }).then((res)=>{
        if(res.body == "login success") {
          this.show = false
        }
        console.log(res)
      })
    }
  }
}
</script>

<style>
.login {
  background-color: pink;
  width: 300px;
  margin:0 auto;
  position: fixed;
  top: 50%;
  left:50%;
  margin-left: -150px;
  z-index: 10000;
}
#loginPwd,
#loginName {
  margin-top: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
