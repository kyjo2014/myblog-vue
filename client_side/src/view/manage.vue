<template>
    <div class="manageView">
        <router-view name="manage" class="manage-content"></router-view>
    
    </div>
</template>
<script>

export default {
    data() {
        return {
            dialog: false
        }
    },
    computed: {

    },
    methods: {

    },
    components: {

    },
    beforeRouteEnter(to, from, next) {

        next((vm) => {
            if (!vm.$store.state.login.isHost) {
                vm.$router.replace('/')
            }
        })
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

