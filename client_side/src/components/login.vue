<template>
    <mu-dialog id="login-popup" :open="show" title="Dialog" @close="close">
        <div class="guest" v-if="isGuest">
            <mu-text-field name="id" v-model="guestInfo.nickName" hintText="你的昵称" />
            <mu-text-field name="value" v-model="guestInfo.email" hintText="你的邮箱" />
        </div>
        <div class="host" v-else>
            <mu-text-field name="id" v-model="hostInfo.id" hintText="你的用户名" />
            <mu-text-field name="value" v-model="hostInfo.pwd" hintText="你的密码" />
        </div>
        <div class="role-sel">
            <mu-radio label="游客" name="role" nativeValue="guest" v-model="role" class="demo-radio" />
            <mu-radio label="管理员" name="role" nativeValue="host" v-model="role" class="demo-radio" />
        </div>
         <mu-flat-button label="登录" class="demo-flat-button" @click="login" primary/>
    </mu-dialog>
</template>
<script>
export default {
    data() {
        return {
            role: "guest",
            guestInfo: {
                nickName: '',
                email: ''
            },
            hostInfo: {
                id: '',
                pwd: ''
            }
        }
    },
    mounted() {

    },
    computed: {
        isGuest() {
            return this.role == "guest"
        }
    },
    methods: {
        login() {
            let body = {
                role: 'guest'
            }
            if (this.isGuest) {
                body = this.guestInfo

            } else {
                body = this.hostInfo
                body.role = 'host'
            }
            this.$http.post('users/login', body).then((res) => {
                alert(res)
            }, (err) => {
                console.error(err)
            })
        },
        close() {
            this.show = false
        }
    },
    props: {
        show: {
            require: true
        }
    }
}
</script>
<style lang="stylus">
    
</style>