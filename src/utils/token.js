const TOKENKEY = 'token_key'


function setToken(token){
    console.log('把token存到本地了')
    localStorage.setItem(TOKENKEY, token)
}

function getToken(){
    console.log('取得token了')
    return localStorage.getItem(TOKENKEY)
}

function removeToken(){
    localStorage.removeItem(TOKENKEY)
    console.log("清除了")
}

export {
    setToken,
    getToken,
    removeToken
}