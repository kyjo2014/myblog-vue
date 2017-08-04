<template>
    <div id="postsList-view">
        <mu-list class="postsList">
            <mu-list-item v-for="i in posts" :key="i.id" title="All mail">
                <mu-raised-button label="点这里" slot="right" ref="button" @click="toggle" />
            </mu-list-item>
        </mu-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            posts: [

            ]
        }
    }
}
</script>
<style>

</style>


