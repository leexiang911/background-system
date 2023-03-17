import request from '@/utils/request';


/**
 * 获取网站的所有设置
 * @returns 
 */
export function getSetting() {
    return request({
        url: "/api/setting",
        method: "get"
    });
}


/**
 * 修改网站中的所有设置
 * @param {*} data 
 * @returns 
 */
export function reviseSetting(data) {
    return request({
        url: "/api/setting",
        method: "put",
        data
    });
}