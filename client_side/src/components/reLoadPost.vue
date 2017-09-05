<template>
    <div class="reload-icon">
        <mu-icon-button @click="reload">
            <i :class="{'material-icons': true ,'spin': spin}">cached</i>
        </mu-icon-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            spin: false
        }
    },
    methods: {
        reload() {
            this.$store.dispatch('loadPage',1)
            this.spin = true
            setTimeout(function() {
                this.spin = false
            }.bind(this), 1000)
        }
    }


}
</script>
<style scoped>
.reload-icon {
    display: inline-block;
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(360deg);
    }
}
</style>

