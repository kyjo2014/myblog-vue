<template>
    <mu-dialog dialogClass="login-popup" :open="show" title="登录" @close="close">
        <div class="input guest" v-if="isGuest">
            <mu-text-field name="id" v-model="nickName" :errorText="errNickname" :maxLength="20" hintText="你的昵称" />
            <br/>
            <mu-text-field name="value" v-model="email" :errorText="errEmail" hintText="你的邮箱" />
        </div>
        <div class="input host" v-else>
            <mu-text-field name="id" v-model="hostInfo.id" hintText="你的用户名" />
            <br/>
            <mu-text-field name="value" v-model="hostInfo.password" hintText="你的密码" />
        </div>
        <div class="role-sel">
            <mu-radio label="游客" name="role" nativeValue="guest" v-model="role" class="demo-radio" />
            <mu-radio label="管理员" name="role" nativeValue="host" v-model="role" class="demo-radio" />
            <br/> 游客可直接登录
        </div>
        <div class="login-ctrl">
            <mu-flat-button label="登录" class="login-btn" @click="login" primary/>
        </div>
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
                password: ''
            },
            errEmail: '',
            errNickname: ''
        }
    },

    mounted() {

    },
    computed: {
        isGuest() {
            return this.role == "guest"
        },
        isShow() {
            return this.show
        },
        email: {
            set: function (val) {
                const emailExp = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i
                if (emailExp.test(val)) {
                    this.guestInfo.email = val
                    this.errEmail = ''
                } else {
                    this.guestInfo.email = ''
                    this.errEmail = '邮件格式错误'
                }
            },
            get: function () {
                return this.guestInfo.email
            }
        },
        nickName: {
            set: function (val) {
                this.guestInfo.nickname = val
            },
            get: function () {
                return this.guestInfo.nickname
            }
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
            this.$store.dispatch('login', body)
           
        },
        close() {
            this.$emit('close')
        }
    },
    props: {
        show: {
            require: true
        }
    }
}
</script>
<style>
.login-popup {
    width: 460px;
    padding: 10px;
}
</style>

<style scoped>
.input,
.role-sel {
    text-align: center;
}

.login-ctrl {
    text-align: center;
}
</style>