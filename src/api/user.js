import request from '@/utils/request'

/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}
//恢复登录
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}
/**
 * 退出登录
 * @returns 
 */
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  });
}

/**
 * 更新信息
 * @param {*} data 
 * @returns 
 */
export function reviseInfo(data){
  return request({
    url:"/api/admin",
    method:"put",
    data,
  })
}