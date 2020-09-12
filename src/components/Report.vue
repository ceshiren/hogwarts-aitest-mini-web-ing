<template>
    <div style="margin:20px">
        <h1>报告管理</h1>
        <div id="myChart" style="width:800px;height:600px"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            countX: [],
            countData:[],
        }
    },
    created(){
        this.$api.report.getCaseCount().then(res=>{
            let listData = []
            listData = res.data.data

            for(let i=0;i<listData.length;i++){
                this.countX.push("任务id"+listData[i].id)
                this.countData.push(listData[i].caseCount)
            }
            this.drawEchart()
        })
        
    },
    methods:{
        drawEchart(){
            var echarts = require('echarts')
            var myChart = echarts.init(document.getElementById('myChart'))
            myChart.setOption({

                xAxis: {
                    type: 'category',
                    data: this.countX
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.countData,
                    type: 'line'
                }]
            })
        }
    }
}
</script>

<style scoped>

</style>