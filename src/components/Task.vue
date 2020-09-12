<template>
    <div>
        <h1>任务管理</h1>
        <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer>

        <template v-slot:item.status="{item}">
            <div v-if="item.status==0">无效</div>
            <div v-else-if="item.status==1">新建</div>
            <div v-else-if="item.status==2">执行中</div>
            <div v-else-if="item.status==3"><a @click="getAllure(item)">执行完成</a></div>
        </template>

        <template v-slot:item.action="{item}">
            <v-btn v-if="item.status==1" color="primary" small @click="doTask(item)" >执行任务</v-btn>
            <v-btn small v-else disabled>执行任务</v-btn>

        </template>

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
                {text:'JenkinsId',value:'testJenkinsId'},
                {text:'用例数量',value:'caseCount'},
                {text:'状态',value:'status'},
                {text:'备注',value:'remark'},
                {text:'操作',value:'action'}
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
        },
        doTask(item){
            let params = {
                taskId: item.id
            }
            console.log(params)
            this.$api.task.doTask(params).then( res=>{
                if(res.data.resultCode==1){
                    this.$notify({
                        title:'成功',
                        message:'执行成功',
                        type:'success'
                    })
                }
                this.getTaskList()
            }

            )

        },
        getAllure(item){
            let params = {
                id: item.id
            }

            this.$api.report.getAllure(params).then( res=>{
                window.open(res.data.data.allureReportUrl,"_blank")
            })

        }


    }
}
</script>

<style scoped>

</style>