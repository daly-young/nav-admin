import { _getPromise, _postPromise } from './common'
//import { config } from './config'
export const login = (param) => {
    return _postPromise('/user/login', param)
}
export const register = (param) => {
    return _postPromise('/user/register', param)
}
export const isPower = () => {
    return _postPromise('/user/getPower', null)
}
export const getCateList = (param) => {
    return _getPromise('/cate/findAll', param)
}
export const getUrlList = (param) => {
    return _getPromise('/nav/findAll', param)
}
export const delCateItem = (param) => {
    return _postPromise('/cate/del', param)
}
export const delListItem = (param) => {
    return _postPromise('/nav/del', param)
}
export const addCateItem = (param) => {
    return _postPromise('/cate/add', param)
}
export const addListItem = (param) => {
    return _postPromise('/nav/add', param)
}
export const editCateItem = (param) => {
    return _postPromise('/cate/edit', param)
}
export const editUrl = (param) => {
    return _postPromise('/nav/edit', param)
}
