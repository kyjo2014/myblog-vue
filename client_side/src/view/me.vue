<template>
    <div id="user">
        <mu-avatar :src="require('../assets/logo.png')" backgroundColor="pink400" :size="150" class="user-icon" :iconSize="150" />
        <h1>{{userName}}</h1>
        <div class="user-info-list">
            <mu-list>
                <userInfoItem v-for="(value,key) in userInfo" :icon="value.icon" :name="key" :value='value.value' :key="key" />
            </mu-list>
        </div>
    </div>
</template>
<script>
import userInfoItem from '../components/userInfoItem.vue'

export default {
    data() {
        return {
            userName: '123',
            userInfo: {
                '邮箱': {
                    icon: '',
                    value: '123@'
                },
                'github': {
                    icon: '',
                    value: '1234'
                }
            }
        }
    },
    components: {
        userInfoItem
    }
}
</script>
<style>

</style>

<style scope>
#user {
    padding-top: 120px;
    text-align: center;
}

.user-icon {
    margin: 0 auto;
    display: block!important;
}

.user-info-list {
    width: 75%;
    margin: 0 auto;
}
</style>


