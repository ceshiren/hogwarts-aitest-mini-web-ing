<template>
    <div style="margin:20px">
        <v-btn color="primary" @click="openDiolog()">添加Jenkins</v-btn>
        <v-dialog v-model="addDialog" max-width="400">
            <v-card>
                <v-card-title>{{dialogTitle}}</v-card-title>
                <v-card-text>
                    <v-text-field v-model="addItems.name" label="名称"></v-text-field>
                    <v-text-field v-model="addItems.testCommand" label="测试命令"></v-text-field>
                    <v-text-field v-model="addItems.url" label="Jenkins地址"></v-text-field>
                    <v-text-field v-model="addItems.userName" label="用户名"></v-text-field>
                    <v-text-field v-model="addItems.password" label="密码" type="password"></v-text-field>
                    <v-select v-model="addItems.commandRunCaseType" :items="items" label="选择类型"></v-select>
                    <v-text-field v-model="addItems.commandRunCasSuffix" label="文件后缀"></v-text-field>
                    <v-text-field v-model="addItems.remark" label="备注"></v-text-field>
                    <v-checkbox v-model="addItems.defaultJenkinsFlag" label="设为默认"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" v-if="dialogTitle=='添加Jenkins'" @click="saveJenkins()">确认</v-btn>
                    <v-btn color="primary" v-else @click="saveEidtJenkins()">确认编辑</v-btn>
                    <v-btn color="primary" @click="close()" text>取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table 
        :headers="headers"
        :items="tableData"
        hide-default-footer>
        <template v-slot:item.action='{item}'>
            <v-btn color="success" small @click="editJenkins(item)">编辑</v-btn>
            <v-btn color="error" small @click="deleteJenkins(item)">删除</v-btn>
        </template>
        <template v-slot:item.commandRunCaseType="{item}">
            <div v-if="item.commandRunCaseType==1">文本</div>
            <div v-if="item.commandRunCaseType==2">文件</div>
        </template>
        <template v-slot:item.defaultJenkinsFlag="{item}">
            <div v-if="item.defaultJenkinsFlag==1">是</div>
            <div v-if="item.defaultJenkinsFlag==0">否</div>
        </template>

        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogTitle:'添加Jenkins',
            tableData:[],
            headers:[
                {text:'JenkinsId',value:'id'},
                {text:'名称',value:'name'},
                {text:'测试命令',value:'testCommand'},
                {text:'Jenkins地址',value:'url'},
                {text:'测试用例类型',value:'commandRunCaseType'},
                {text:'测试用例文件后缀',value:'commandRunCaseSuffix'},
                {text:'是否为默认项',value:'defaultJenkinsFlag'},
                {text:'备注',value:'remark'},
                {text:'操作',value:'action'}
            ],
            addItems:{
                id:'',
                name:'',
                testCommand:'',
                url:'',
                userName:'',
                password:'',
                commandRunCaseType:'',
                commandRunCasSuffix:'',
                remark:'',
                defaultJenkinsFlag:''
            },
            addDialog:false,
            jenkinsName:'',
            items:[
                {text:'文本',value:1},
                {text:'文件',value:2},
            ]
        }
    },
    created(){
        this.getJenkinsList()
    },
    methods:{
        openDiolog(){
            this.dialogTitle = '添加Jenkins'
            this.addDialog = true
        },
        editJenkins(item){
            this.dialogTitle = '编辑Jenkins'
            this.addItems.name = item.name
            this.addItems.id = item.id
            this.addItems.testCommand = item.testCommand
            this.addItems.commandRunCasSuffix = item.commandRunCasSuffix
            this.addItems.commandRunCaseType = item.commandRunCaseType
            this.addItems.password = item.password
            this.addItems.remark = item.remark
            this.addItems.url = item.url
            this.addItems.userName = item.userName
            this.addDialog = true
        },
        deleteJenkins(item){
            let params = {
                id:item.id
            }
            this.$api.jenkins.deleteJenkins(params).then(res=>{
                this.getJenkinsList()
                this.$notify({
                    title:'成功',
                    message:'已经成功删除',
                    type:'success'
                })
            })
        },
        getJenkinsList(){
            this.$api.jenkins.getJenkinsList().then(res=>{
                console.log(res)
                this.tableData = res.data.data.data
            })
        },
        saveEidtJenkins(){
            
            let params = {
                id:this.addItems.id,
                commandRunCasSuffix:this.addItems.commandRunCasSuffix,
                commandRunCaseType:this.addItems.commandRunCaseType,
                defaultJenkinsFlag:this.addItems.defaultJenkinsFlag?1:0,
                name:this.addItems.name,
                password:this.addItems.password,
                remark:this.addItems.remark,
                testCommand:this.addItems.testCommand,
                url:this.addItems.url,
                userName:this.addItems.userName
            }

            this.$api.jenkins.editJenkins(params).then(res=>{
                
                this.$notify({
                    title:'成功',
                    message:'修改成功',
                    type:'success'
                })
                this.close()
                this.getJenkinsList()
            })
        },
        saveJenkins(){
            let params = {
                commandRunCasSuffix:this.addItems.commandRunCasSuffix,
                commandRunCaseType:this.addItems.commandRunCaseType,
                defaultJenkinsFlag:this.addItems.defaultJenkinsFlag?1:0,
                name:this.addItems.name,
                password:this.addItems.password,
                remark:this.addItems.remark,
                testCommand:this.addItems.testCommand,
                url:this.addItems.url,
                userName:this.addItems.userName
            }
            this.$api.jenkins.addJenkins(params).then(res=>{
                console.log(res)
                this.$notify({
                    title:'成功',
                    message:'添加成功',
                    type:'success'
                })
                this.close()
                this.getJenkinsList()
            })
        },

        close(){
            this.addDialog = false
        }
    }
}
</script>

<style scoped>

</style>