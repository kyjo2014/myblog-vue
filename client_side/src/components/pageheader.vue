<template>
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="isOpen">
        {{message}}
    </mu-popup>
</template>
<script>

export default {
    data() {
        return {
            topPopup: false
        }
    },
    props: {
        isOpen: {
            type: Boolean
        },
        message: {
            type: String
        }
    }
}
</script>
<style>
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


