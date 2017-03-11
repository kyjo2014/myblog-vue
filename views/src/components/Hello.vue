<template>
<div>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    {{log}}
  </mu-popup>
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1"  @active="getUser" title="用户"/>
    <mu-tab value="tab2"  @active="getPosts" title="文章"/>
    <mu-tab value="tab3" @active="handleActive" title="种类"/>
    <mu-tab value="tab4"  @active="handleActive" title="标签"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
    <h2>用户</h2>
     <mu-text-field label="用户名" v-model="searchUser" labelFloat/>
      <mu-flat-button label="搜索" @click="getUserByName" class="demo-flat-button"/></br>
    <mobile-tear-sheet>
      <mu-list v-for=" i in users">
        <mu-list-item :title="i.Uaccount" describeText="Jan 9, 2014">
          <mu-avatar icon="folder" slot="leftAvatar"/>
          <mu-icon value="info" @click="deleteUser(i.Uid)" slot="right"/>
        </mu-list-item>
      </mu-list>
    </mobile-tear-sheet> 
      <mu-text-field label="用户名" v-model="newUserAC.account" labelFloat/><br/>
      <mu-text-field label="邮箱" v-model="newUserAC.email" labelFloat/><br/>
     <mu-flat-button label="增加" @click="createUser" class="demo-flat-button"/>
     
  </div>
  <div v-if="activeTab === 'tab2'">
     <mu-raised-button label="新文章" @click="open('left')"/>
    <mu-card v-for="i in posts">
      <mu-card-header :title="i.Uid" :subTitle="i.author_name">
        {{showTag}}

      </mu-card-header>
      <mu-card-title :title="i.title" :subTitle="i.time"/>
      <mu-card-text>
       {{i.content}}
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button @click="showchange(i.Aid)" label="修改"/>
        <mu-flat-button @click="deletePost(i.Aid)" label="删除"/>
      </mu-card-actions>
    </mu-card>
     <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" leftPopup="" @close="close('left')">
        
        <mu-text-field label="标题" v-model="newPost.title" labelFloat/><br/>
        <mu-text-field label="文章内容" v-model="newPost.content" multiLine :rows="3" :rowsMax="6" labelFloat/><br/>
        <h2>标签</h2>
        <mu-checkbox v-for="i in tags" :label="i.name" :nativeValue="i.id" name="group"  v-model="newPost.tags"  class="demo-checkbox"/> <br/>
        <h2>分类</h2>
        <mu-radio v-for="i in sorts" :label="i.name" name="group" :nativeValue="i.id" v-model="newPost.sort" class="demo-radio"/>
        <mu-flat-button @click="addPost" label="增加"/>
      </mu-popup>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
      <mu-appbar title="弹出">
        <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')"/>
      </mu-appbar>
      <mu-content-block>
          <mu-text-field label="标题" v-model="newPost.title" labelFloat/><br/>
          <mu-text-field label="文章内容" v-model="newPost.content" multiLine :rows="3" :rowsMax="6" labelFloat/><br/>
          <mu-flat-button @click="changePost" label="修改"/>
      </mu-content-block>
  </mu-popup>
  </div>
  <div v-if="activeTab === 'tab3'">
    <h2>种类</h2>
    <mu-list v-for=" i in sorts">
        <mu-list-item :title="i.name" >
        
          <mu-icon value="info" @click="deleteSort(i.id)" slot="right"/>
        </mu-list-item>
      </mu-list>
      
  </div>
  <div v-if="activeTab === 'tab4'">
    <h2>标签</h2>
    <mu-list v-for=" i in tags">
        <mu-list-item :title="i.name" >
        
          <mu-icon value="info" @click="deleteSort(i.id)" slot="right"/>
        </mu-list-item>
      </mu-list>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      searchUser: null,
      activeTab: 'tab1',
      users: [],
      newUserAC: {
        account: "",
        email: ""
      },
       topPopup: false,
       leftPopup:false,
       bottomPopup: false,
      log: '',
      posts:[],
      newPost:{
        Aid: null,
        title: '',
        content: '',
        Uid: null,
        sort: null,
        title: 'createBBB',
        tags:[]
      },
      tags: [],
      sorts: [],
      selectTags:[],
      selectSort: null
    }
  },
  computed (){
    
  },
  mounted(){
    this.getTags()
    this.getSorts()
  },
  methods: {
    showTags(group){
      this.getTags
      return []
    },
     open (position) {
      this[position + 'Popup'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      
    },
    getUser(){
      this.$http.get('http://localhost:3000/api/users').then((res)=>{
        this.users = res.body
      })
    },
    getUserByName(name) {
      this.$http.get('http://localhost:3000/api/users/'+this.searchUser).then((res)=>{
        this.users = res.body
      })
    },
    deleteUser(id) {
      this.$http.delete('http://localhost:3000/api/users/'+ id).then(
        (res)=>{
          this.log = res.body

        this.open('top')
        }
      )
    },
    createUser() {
      this.$http.post('http://localhost:3000/api/users',{
        Uaccount: this.newUserAC.account,
        Uemail: this.newUserAC.email
      }).then((result)=>{
        if(result.body != 'add success')
          this.log = '失败'
        else 
          this.log = '成功'

        this.open('top')
      })
    },
    getPosts(){
        this.$http.get('http://localhost:3000/api/posts').then((res)=>{
          this.posts = res.body
        })
    },
    selectPosts() {
      
    },
    showchange(id) {
      this.open('bottom')
      this.newPost.Aid = id
    },
    changePost() {
      this.$http.put('http://localhost:3000/api/posts/'+ this.newPost.Aid,{
        title: this.newPost.title,
        content: this.newPost.content
      },{

      }).then((res)=>{
        this.log = res.body
        this.open('top')
      })
    },
    deletePost(id) {
      this.$http.delete('http://localhost:3000/api/posts/'+id,{
        headers: {
          'Content-Type':"application/json;charset=utf-8"
        }
      } ).then((result)=>{
        this.log = result.body
        this.open('top')

      })
    },
    addPost(){
      this.$http.post('http://localhost:3000/api/posts',{
        'title': this.newPost.title,
        'content': this.newPost.content,
        'Uid': 1,
        'sort': this.newPost.sort,
        'tags': "["+this.newPost.tags +"]"
      }).then((res)=>{
         this.log = res.body
        this.open('top')
      })
    },
    getTags() {
      this.$http.get('http://localhost:3000/api/tags').then((res)=>{
        this.tags = res.body
      })
    },
    getSorts(){
      this.$http.get('http://localhost:3000/api/sort').then((res)=>{
        this.sorts = res.body
      })
    },
    addSorts() {
      this.$http.post('http://localhost:3000/api/sort',{
        name: sortName
      }).then((res)=>{
        this.log = res.body
        this.open('top')
      })
    }
  },
   watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>

<style>
  .demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  background-color: orange!important;
}
.demo-popup-bottom {
  width: 100%;
  max-width: 375px;
}
</style>