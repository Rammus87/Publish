import { request } from "@/utils";

export function loginAPI(FormData){
    return request({
        url:'/authorizations',
        method:'POST',
        data:FormData
    })
}

export function getProfileAPI(){
    return request({
        url:'/user/profile',
        method:'GET',
    })
}