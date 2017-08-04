<template>
    <div class="manageView">
        <router-view name="manage" class="manage-content"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
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

