// 工具函数库
/**
 * 
 * @param {Number} timestamp 时间戳
 * @returns {String} 年年年年-月月-日日 时时:分分:秒秒 星期几
 */
export function formatDate(timestamp) {
    let date = new Date(parseInt(timestamp));
    // 年/月/日/时/分/秒   /* padStart(2, '0')用来填充零 */
    let year = date.getFullYear();//年
    let month = (date.getMonth() + 1).toString().padStart(2, '0');//月份是从0开始的要加一
    let day = date.getDate().toString().padStart(2, '0');//日
    let hours = date.getHours().toString().padStart(2, '0');//时
    let minutes = date.getMinutes().toString().padStart(2, '0');//分
    let seconds = date.getSeconds().toString().padStart(2, '0');//秒

    //一个星期
    let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let week = weekArr[date.getDay()];//获得星期几

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + " " + week;
}