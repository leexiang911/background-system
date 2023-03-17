import request from '@/utils/request';

/**
 *  获取评论
 * @returns 
 */
export function getComments(page = 1, limit = 10) {
    return request({
        url: "/api/comment",
        method: "get",
        params: {
            page,
            limit,
        }
    });
}

/**
 * 删除评论
 * @param {*} id 
 * @returns 
 */
export function deleteComments(id) {
    return request({
        url: `/api/comment/${id}`,
        method: "delete"
    });
}

/**
 * 添加评论
 * @returns 
 */
export function addComment() {
    return request({
        url: "/api/comment",
        method: "post",
    });
}