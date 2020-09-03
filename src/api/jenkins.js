import axios from './http'

const jenkins = {
    addJenkins(params){
        return axios.post('/jenkins',params)
    },
    getJenkinsList(params){
        return axios.get('/jenkins/list',params)
    },
    deleteJenkins(params){
        return axios.delete('/jenkins/'+params.id)
    },
    editJenkins(params){
        return axios.put('/jenkins',params)
    }
}

export default jenkins;