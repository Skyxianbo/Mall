import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userName: username,
      password: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getPermission(params) {
  return request({
    url: '/adMenu/findMenuByRole',
    method: 'get',
    params: params
  })
}

export function changePassword(id, password) {
  return request({
    url: '/user/add',
    method: 'post',
    data: {
      id: id,
      passWord: password
    }
  })
}