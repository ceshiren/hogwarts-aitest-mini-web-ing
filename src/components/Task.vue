<template>
    <div>
        <h1>任务管理</h1>
        <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer>
        </v-data-table>
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
        }
    },
    created(){
        this.getTaskList()
    },
    methods:{
        getTaskList(){
            this.$api.task.getTaskList().then(res=>{
                this.tableData = res.data.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>