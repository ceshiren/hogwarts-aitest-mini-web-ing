import axios from './http'

const cases = {
    addCaseText(params){
        return axios.post('/testCase/text',params)
    },
    addCaseFile(params){
        return axios('/testCase/file',{
            method:post,
            data:params,
            headers:{'Content-type':'multipart/form-data'}
        })
    },
    getCasesList(params){
        return axios.get('/testCase/list',params)
    },
    deleteCase(params){
        return axios.delete('/testCase/'+params.id)
    },
}

export default cases;