import axios from 'axios'
//import { config } from './config'

export const formatRet = (data) => {
    return data.ret || data
}
// the promise way of get service data
export const _getPromise = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        }).then((response) => {
            resolve(formatRet(response.data))
        }, (response) => {})
    }).catch((err) => {
        console.log(err)
    })
}

// the promise way of post service data
export const _postPromise = (url, data) => {
    if (data && typeof data === 'object') {
        for (var key of Object.keys(data)) {
            data[key] = data[key] || typeof data[key] === 'number' ? data[key] : ''
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(url, data).then((response) => {
            resolve(formatRet(response.data))
        }, (response) => {})
    }).catch((err) => {
        console.log(err)
    })
}
