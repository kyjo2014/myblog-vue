<template>
    <div class="posts">
        <h1>{{data.title}}</h1>
        <h3>{{data.createAt}}</h3>
        <div class="content">
            {{data.content}}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '123',
            createAt: '456',
            content: '789',
            data: {
                title: '',
                createAt: '',
                content: ''
            }
        }
    },
    mounted() {
        this.fetchData(this.$route.params.id)
    },
    computed:{
        
    },
    methods: {
        fetchData(id) {
            this.$http.get(`http://localhost:3000/posts/${id}`)
                .then((res) => {
                    if (res.status == '200' && res.data.code == '200') {
                        let data = res.data.data
                        Object
                            .keys(data)
                            .forEach((i) => {
                                this.data[i] = data[i]
                            })
                    }
                })
        }
    }
}    
</script>
<style lang="stylus">

</style>

