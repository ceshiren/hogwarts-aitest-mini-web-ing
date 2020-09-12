import axios from './http'

const task = {
    addTask(params){
        return axios.post('/task',params)
    },
    getTaskList(params){
        return axios.get('/task/list',{params})
    },
    deleteTask(params){
        return axios.delete('/task/'+params.id)
    },
    doTask(params){
        return axios.post('/task/start',params)
    }
}

export default task;