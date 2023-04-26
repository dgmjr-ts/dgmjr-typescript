/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 06:12:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/
import { UsernameAndPasswordCredentials } from "../../../http-credentials/index";
import { ContentTypes } from "../../../http-helper-constants/src/ContentTypes";
import { HttpMethods } from "../../../http-helper-constants/HttpMethods";
import { HttpRequestHeaders } from "../../../http-helper-constants/HttpRequestHeaders";
import { NewTumblApoEndpoints, NewTumblUrls } from "./NewTumbl.Constants";
import { NewTumblLogin } from "./NewTumbl.Login";
import fetch from 'node-fetch';
import { JSDOM } from "jsdom";

export class NewTumbl extends NewTumblLogin {
    constructor(credentials: UsernameAndPasswordCredentials) {
        super(credentials);
    }

    public async login() {
        const signInScreen = new JSDOM((await fetch(NewTumblUrls.SignIn)).text());
        
        , {
            method: HttpMethods.POST,
            headers: {
                "Content-Type": ContentTypes.APPLICATION_JSON
            },
            body: JSON.stringify(this.credentials)
        });
        const json = await response.json();
        this.credentials = new UsernameAndPasswordCredentials(json.username, json.password);
        return this.credentials;
    }

    public async Promise<NewTumblApiResponse> sendRequest(url: string, ...args: any[]) {
        var requestBodyJson = {"Params":"[{IPADDREESS}]}", 
        return fetch(url, 
            {
                method: HttpMethods.Post,
                headers: {
                    [HttpRequestHeaders.ContentType]: ContentTypes.ApplicationXWwwFormUrlencoded,
                    [HttpRequestHeaders.Origin]: NewTumblUrls.BaseUrl,
                    [HttpRequestHeaders.Referer]: NewTumblUrls.BaseUrl,
                    'HOST': new URL(url).host,
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': 'macOS'
                },
                body: 
    }

    public async getBlogs() {
        https://api-ro.newtumbl.com/sp/NewTumbl/search_Dash_Activity?affinity=937620435476684400
    }
}
