<template>
    <div>
        <h1>任务管理</h1>
        <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer>
        </v-data-table>
        <v-pagination v-if="pageLength>0" v-model="currentPage" :length="pageLength" @input="getTaskList()" total-visible="7"></v-pagination>

    </div>
</template>

<script>
export default {
    data(){
        return {
            headers:[
                {text:'名称',value:'name'},
                {text:'用例数量',value:'caseCount'},
                {text:'备注',value:'remark'}
            ],
            tableData:[],
            currentPage:1,
            pageLength:0,
            rows:''

        }
    },
    created(){
        this.getTaskList()
    },
    methods:{
        getTaskList(){

            let params = {
                pageNum: this.currentPage,
                pageSize: 5
            }

            this.$api.task.getTaskList(params).then(res=>{
                this.tableData = res.data.data.data
                this.rows = res.data.data.recordsTotal
                this.pageLength = Math.ceil(this.rows/5)
            })
        }
    }
}
</script>

<style scoped>

</style>