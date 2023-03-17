import request from '@/utils/request';


/**
 * 查找文章
 * @param {Number} page 页码
 * @param {Number} limit 页容量
 * @returns 
 */
export function findBlog(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page,
            limit,
        }
    });
}
/**
 * 删除文章
 * @param {String} id 文章id
 * @returns 
 */
export function deleteOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "delete",
    });
}

/**
 * 添加文章
 * @param {*} data 传给服务器的数据
 * @returns 
 */
export function addOneblog(data) {
    return request({
        url: '/api/blog',
        method: "post",
        data: data,
    });
}



/**
 * 根据id获取单篇文章
 * @param {*} id 
 * @returns 
 */
export function getAblog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "get"
    });
}

/**
 * 编辑文章
 * @param {Object} blogInfo 文章对象
 * @returns 
 */
export function editBlog(blogInfo) {
    return request({
        url: `/api/blog/${blogInfo.id}`,
        method: 'put',
        data: blogInfo.data
    })
}

export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get'
    })
}
//

/* 

export function findBlog(page=1,limit=10){
    return request({
        url : '/api/blog',
        method : 'get',
        params : {
            page,
            limit
        }
    })
}


// 删除文章
export function delOneBlog(id){
    return request({
        url : `/api/blog/${id}`,
        method : 'delete'
    })
}

// 添加文章


// 编辑文章
// 倒时候调用这个接口时，需要传递一个对象
// {
//     id : 要修改的文章的 id,
//     data : 修改的文章的所有内容
// }



// 根据 id 查找某一篇文章
*/