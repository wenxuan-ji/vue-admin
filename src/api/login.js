import service from '@/utils/request';
/**
 * 获取验证码
 */
export function GetSms(requestData){
    return service.request({
        method: "post",
        url: "/getsms/",
        data: requestData
    })
}

/**
 * 登录
 */

export function Login(){
    service.request({
        method: "post",
        url: "/login",
        data: {}
    })
}