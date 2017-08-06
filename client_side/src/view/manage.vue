<template>
    <div class="manageView">
        <router-view name="manage" class="manage-content"></router-view>
        <login show="true"></login>
    </div>
</template>
<script>
import login from '../components/login'
export default {
    data() {
        return {
            dialog: false
        }
    },
    methods: {

    },
    components: {
        login
    },
    beforeRouteEnter(to, from, next) {
        next()
    }
}
</script>
<style>
.manageView {
    background-color: white;
    overflow: auto;
    height: 100%;
}

.manage-content {
    padding: 10px;
}
</style>

