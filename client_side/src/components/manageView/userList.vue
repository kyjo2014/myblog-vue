<template>
    <div class="userList">
        <useritem v-for="i in users" :data="i" :key="i.id"></useritem>
    </div>
</template>
<script>
import useritem from './useritem'
export default {
    data() {
        return {
            users: [
                '123'
            ]
        }
    },
    components: {
        useritem
    },
    methods: {
        fetchData() {
            this.$http.get(`http://localhost:3000/users`).then((res)=>{
                if(res.data.code == '200') {
                    this.users = res.data.data
                }
            })
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>
<style>

</style>
<style scoped>

</style>

