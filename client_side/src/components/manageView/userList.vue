<template>
    <mobile-tear-sheet>
        <mu-list>
            <mu-list-item :title="item.name" v-for="item in items">
                <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar" />
                <span slot="describe">
                    <span style="color: rgba(0, 0, 0, .87)">Email:</span>{{item.email}}
                </span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                    <mu-menu-item title="回复" />
                    <mu-menu-item title="删除" />
                </mu-icon-menu>
            </mu-list-item>
            <mu-divider inset/>
    
        </mu-list>
    </mobile-tear-sheet>
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    name: 'default',
                    email: 'default@default.com'
                }
            ]
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.$http.get(`http://localhost:3000/users`)
        }
    }
}
</script>