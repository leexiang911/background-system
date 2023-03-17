import request from "@/utils/request";//导入request
export function getCaptcha(params) {
    return request({
      url: '/res/captcha',
      method: 'get',
    })
  }
  