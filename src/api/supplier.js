import request from '@/utils/request'

export function getSupplier(param) {
  return request({
    url: '/supplier/find',
    method: 'get',
    params: param
  })
}

export function addSupplier(param) {
  return request({
    url: '/supplier/add',
    method: 'post',
    data: param
  })
}
