<template>
    <div style="margin:20px">
        <v-btn @click="addDialog = true" color="primary">添加用例</v-btn> 
        <v-btn @click="addTask = true" color="primary">生成任务</v-btn> 
        <v-dialog v-model="addTask" width="400">
            <v-card>
                <v-card-title>生成任务</v-card-title>
                <v-card-text>
                    <v-text-field label="任务名称" v-model="taskName"></v-text-field>
                    <v-text-field label="备注" v-model="taskRemark"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addTestTask()">确认</v-btn>
                    <v-btn color="primary" text @click="close()">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addDialog" width="400">
            <v-card>
                <v-card-title>添加用例</v-card-title>
                <v-card-text>
                    <v-text-field v-model="caseName" label="名称"></v-text-field>
                    <v-select :items="items" v-model="selected" label="选择用例类型"></v-select>
                    <v-textarea v-if="selected==1" v-model="caseData" label="输入文本"></v-textarea>
                    <v-file-input v-else-if="selected==2" v-model="file" label="请选择你的文件"></v-file-input>
                    <v-text-field label="备注" v-model="remark"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveCase()">确认</v-btn>
                    <v-btn color="primary" text @click="close()">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table
        v-model="selectedCases"
        :headers="headers"
        :items="tableData"
        hide-default-footer
        show-select
        >
        
            <template v-slot:item.action='{item}'>
                <v-btn color="error" small @click="deleteCase(item)">删除</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            taskName:'',
            taskRemark:'',
            addTask:false,
            selectedCases:[],
            remark:'',
            file:null,
            caseData:'',
            caseName:'',
            tableData:[],
            headers:[
                {text:'名称',value:'caseName'},
                {text:'数据',value:'caseData'},
                {text:'备注',value:'remark'},
                {text:'操作',value:'action'}
            ],
            remark:'',
            selected:'',
            items:[
                {text:'文本',value:1},
                {text:'文件',value:2}
            ],
            addDialog:false,
        }
    },
    created(){
        this.getCasesList()
    },
    methods:{
        addTestTask(){
            let casesId = []
            for(let i=0;i<this.selectedCases.length;i++){
                casesId.push(this.selectedCases[i].id)
            }

            let param = {
                caseIdList:casesId,
                testTask:{
                    name:this.taskName,
                    remark:this.taskRemark
                }
            }
            this.$api.task.addTask(param).then(res=>{
            
                this.$notify({
                    title:'成功',
                    message:'添加成功',
                    type:'success'
                })

                this.$router.push('/task')
            })
        },
        deleteCase(item){
            let params = {
                id:item.id
            }
            this.$api.deleteCase(params).then(res=>{
                
                this.$notify({
                    title:'成功',
                    message:'删除成功',
                    type:'success'
                })
                this.getCasesList()
            })
        },
        getCasesList(){
            this.$api.cases.getCasesList().then(res=>{
                console.log(res)
                this.tableData = res.data.data.data
            })
        },
        saveCase(){
            if(this.selected==1){
                let params = {
                    caseName:this.caseName,
                    caseData:this.caseData,
                    remark:this.remark
                }
                this.$api.cases.addCaseText(params).then(res=>{
                    this.$notify({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    this.close()
                    this.getCasesList()
                })
            }else if(this.selected==2){
                let params = new FormData()
                params.append('caseFile',this.file)
                params.append('caseData',this.caseData)
                params.append('caseName',this.caseName)
                params.append('remark',this.remark)

                this.$api.cases.addCaseFile(params).then(res=>{
                    
                    this.$notify({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    this.close()
                    this.getCasesList()
                })
            }
        },
        close(){
            this.addDialog = false
            this.addTask = false
        }
    }
}
</script>

<style scoped>

</style>