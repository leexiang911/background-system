import request from '@/utils/request';



/**
 * 添加分类(添加文章分类)
 * @param {any} data Headers：Content-Type(application/json) Authorization(Bearer)
 * @returns Promise
 */
export function addBlogType(data) {
    return request({
        url: "/api/blogtype",
        method: "post",
        data,
    });
}

/**
 * 获取文章分类
 * @returns Promise
 */
export function getBlogType() {
    return request.get("/api/blogtype");
}


/**
 * 获取一个分类
 * @param {*} id 文章id
 * @returns Promise
 */
export function getAblogType(id) {
    return request.get(`/api/blogtype/${id}`);
}

/**
 * 修改分类
 * @param {*} id 分类id Headers：Content-Type(application/json) Authorization(Bearer)
 * @returns Promise
 */
export function reviseBlogType(editInfo) {
    return request({
        url: `/api/blogtype/${editInfo.id}`,
        method: 'put',
        data: editInfo.data,
    });
}


/**
 * 添加分类
 * @param {*} id 文章id
 * @returns Promise
 */
export function deleteBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: "delete"
    });
}