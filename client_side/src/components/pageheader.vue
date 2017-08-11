<template>
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
        {{message}}
    </mu-popup>
</template>
<script>

export default {
    data() {
        return {
            topPopup: true
        }
    },
    computed: {
        message: {
            get: function () {
                return this.$store.state.message
            }
        }
    },
    watch: {
        topPopup(val) {
            if (val) {
                setTimeout(() => {
                    this.topPopup = false
                }, 2000)
            }
        }
    }
}
</script>
<style scoped>
.demo-popup-top {
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
}
</style>


