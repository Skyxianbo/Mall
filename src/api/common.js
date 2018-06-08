import request from '@/utils/request'
import { getToken } from '@/utils/auth';


export function getDictInfo(param) {
  return request({
    url: '/common/findAll',
    method: 'get',
    params: {
      typegroupid: param
    }
  })
}

export function goTo(url, obj) {
  let toGo = process.env.BASE_API + '/' + url;
  if (!obj.token) {
    obj.token = getToken()
  }
  for (let i in obj) {
    if (toGo.indexOf('?') > 0) {
      toGo += ('&' + i + '=' + obj[i]);
    } else {
      toGo += ('?' + i + '=' + obj[i]);
    }
  };
  window.location.href = toGo;
}
