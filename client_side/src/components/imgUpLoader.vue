<template>
    <mu-flexbox class="image">
        <mu-flexbox-item order="0" class="flex-demo">
            <mu-float-button icon="add"  class="demo-float-button">
                <input type="file" multiple @change="addImg" style="visibility: hidden">
            </mu-float-button>
    
        </mu-flexbox-item>
        <mu-flexbox-item order="2" span="200" class="flex-demo">
            <mu-grid-list class="gridlist-inline-demo">
                <mu-grid-tile v-for="(tile, index) in list" :key="index">
                    <img :src="tile.image" />
                    <span slot="title">{{tile.title}}</span>
                    <span slot="subTitle">by
                        <b>{{tile.author}}</b>
                    </span>
                    <mu-icon-button icon="star_border" slot="action" />
                </mu-grid-tile>
            </mu-grid-list>
        </mu-flexbox-item>
    
    </mu-flexbox>
</template>
<script>
export default {
    data() {
        return {
            list: [

            ]
        }
    },
    methods: {
        addImage() {
            let fileList = this.files
            let reader = new FileReader()
            
            console.log(this.files)

        }
    }
}
</script>
<style scoped>

</style>


