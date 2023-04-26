/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 06:03:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/
export enum NewTumblUrls {
    BaseUrl = "https://newtumbl.com/",
    ApiRw = "https://api-rw.newtumbl.com/sp/NewTumbl/",
    ApiRo = "https://api-ro.newtumbl.com/sp/NewTumb/",
    SignIn = `${BaseUrl}/sign?in`
}

export enum NewTumblApoEndpoints {
    Logout = "set_User_Logout",
    Login = "set_User_Login",
    Search = "search_Site_Posts?affinity="
}

export enum PostType {
    Video = 7,
    Link = 4,
    Quotes = 2,
    Photo = 5,
    Question = 3,
    Text = 1
}
