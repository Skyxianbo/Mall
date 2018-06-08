import request from '@/utils/request'

export function getUser(param) {
  return request({
    url: '/user/find',
    method: 'get',
    params: param
  })
}

export function addUser(param) {
  return request({
    url: '/user/add',
    method: 'post',
    data: param
  })
}
