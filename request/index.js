import request from './request'

// 用户统计报表
export  function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
