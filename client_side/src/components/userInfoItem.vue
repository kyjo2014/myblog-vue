<template>
    <mu-list-item class="info-item">
        <mu-icon slot="left" :value="icon" />
        <span slot="title">
            <span class="name"> {{name}}:</span>
            <span class="value"> {{value}}</span>
        </span>
    </mu-list-item>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        console.log(name)
    },
    props: {
        name: {
            type: String,
            require: true
        },
        value: {
            type: String,
            require: true
        },
        icon: {
            type: String,
            require: true
        }
    }
}
</script>
<style scope>
.info-item {
    text-align: left;
}
</style>


