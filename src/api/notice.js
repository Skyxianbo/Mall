import request from '@/utils/request'

export function getNotice(param) {
  return request({
    url: '/findNotice',
    method: 'get',
    params: param
  })
}
