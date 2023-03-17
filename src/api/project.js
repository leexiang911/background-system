import request from '@/utils/request';

/**
 * 获取所有项目列表
 * @returns 
 */
export function getAllProject() {
    return request({
        url: "/api/project",
        method: "get",
    });
}

/**
 * 新增一个项目
 * @param {*} data 新增的数据{description:"",name:"",url:"",github:"",thumb:"",order:""}
 * @returns 
 */
export function addAproject(data){
    return request({
        url:"/api/project",
        method:"post",
        data,
    });
}


/**
 * 修改一个项目
 * @param {*} projectInfo 项目数据
 * @returns 
 */
export function reviseAproject(projectInfo) {
    return request({
        url: `/api/project/${projectInfo.id}`,
        method: "put",
        data: projectInfo.data,
    });
}

/**
 * 删除一个项目
 * @param {*} projectInfo 项目数据
 * @returns 
 */
export function deleteAproject(projectInfo) {
    return request({
        url: `/api/project/${projectInfo.id}`,
        method: "delete"
    });
}

