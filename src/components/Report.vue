<template>
    <div style="margin:20px">
        <h1>报告管理</h1>
        <v-btn color="primary" @click="drawEchart()">echart</v-btn>
        <div id="myChart" style="width:800px;height:600px"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created(){
        this.drawEchart()
    },
    methods:{
        drawEchart(){
            var echarts = require('echarts')
            var myChart = echarts.init(document.getElementById('myChart'))
            myChart.setOption({

                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            })
        }
    }
}
</script>

<style scoped>

</style>