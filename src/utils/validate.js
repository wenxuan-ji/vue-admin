/**
 * 过滤特殊字符
 */
export function stripscripts(s){
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i=0;i<s.length;i++) {
        rs = rs + s.substr(i,1).replace(pattern,'');
    }
    return rs;
}
/**
 * 验证邮箱格式
 */
export function checkEmail(value) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value) ? true : false;
}
/**
 * 验证密码
 */
export function checkPassword(value) {
    var reg = /^\d{6,20}$/;
    return reg.test(value) ? true : false;
}
/**
 * 验证 验证码
 */
export function checkCode(value) {
    var reg = /^[a-z0-9]{6}$/;
    return reg.test(value) ? true : false;
}