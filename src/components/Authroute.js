import { Navigate } from "react-router-dom";
import { getToken } from "@/utils";



export function AuthRoute({children}){
    const token = getToken()
    if(token){
        console.log("回首頁")
        return <>{children}</>
    }else{
        console.log('沒token,跳轉回登入頁',token)
        return <Navigate to={'/login'} replace />
    }
}