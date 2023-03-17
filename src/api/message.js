import request from '@/utils/request';

/**
 * 获取留言列表
 * @returns 
 */
export function getMessages(page = 1, limit = 10) {
    return request({
        url: "/api/message",
        method: "get",
        params: {
            limit,
            page
        }
    });
}
/**
 * 删除留言
 * @param {*} id 
 * @returns 
 */
export function deleteMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: "delete"
    })
}