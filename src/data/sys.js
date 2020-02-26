import request from './request'
import qs from 'Qs'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify(data)
  });
}

// 注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: qs.stringify(data)
  });
}

// 修改密码
export function findPwd(data) {
  return request({
    url: '/findPwd',
    method: 'post',
    data: qs.stringify(data)
  });
}

// 发送短信
export function sendMsg(data) {
  return request({
    url: '/send',
    method: 'post',
    data: qs.stringify(data)
  });
}

// export function fetchArticle(id) {
//   return request({
//     url: '/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }
