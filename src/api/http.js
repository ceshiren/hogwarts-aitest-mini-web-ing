import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

var mesIns = null

var api = process.env.API
var instance = axios.create({
    headers:{
        'Content-Type':'application/json',
    },
    baseURL:api
})

instance.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        config.headers.common['token'] = localStorage.getItem('token')
    }
    return config
})

instance.interceptors.response.use(res=>{
    if(res.data.resultCode==1){
        return Promise.resolve(res);
    }else{

        //如果页面已经存在提示信息，则先关闭，再显示
        if(mesIns){
            mesIns.close()
        }

        mesIns = Message({
            type: 'error',
            message: res.data.message,
            center: true
        })

        return Promise.reject(res);
    }
}, error=>{
    const {response} = error
    if(response.status == 401){
        //如果页面已经存在提示信息，则先关闭，再显示
        if(mesIns){
            mesIns.close()
        }

        mesIns = Message({
            type: 'error',
            message: response.data.message,
            center: true
        })

        router.replace({
            path:'/',
            query:{
                redirect: router.currentRoute.fullPath
            }
        })

    }
    return Promise.reject(response)
})

export default instance