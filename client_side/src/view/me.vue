<template>
    <div id="user">
        <mu-avatar :src="userIcon" backgroundColor="pink400" :size="150" class="user-icon" :iconSize="150" />
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
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
        }
    },
    mounted() {
        this.fetchMeData()
    },
    methods: {
        fetchMeData() {
            this.$store.dispatch('fetchUser')
        }
    },
    computed: {
        ...mapGetters([
            'me'
        ]),
        userName() {
            return this.me.name
        },
        userIcon() {
            return this.me.icon
        },
        userInfo() {
            return this.me.info
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
    object-fit: cover;
}

.user-info-list {
    width: 75%;
    margin: 0 auto;
}
</style>


