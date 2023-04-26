/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 06:56:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/ 
import { ContentTypes } from "../../../http-helper-constants/src/ContentTypes";
import { UsernameAndPasswordCredentials } from "../../../http-credentials/src/UsernameAndPasswordCredentials"
import { HttpMethods } from "../../../http-helper-constants/HttpMethods";
import { HttpRequestHeaders } from "../../../http-helper-constants/HttpRequestHeaders";
import { NewTumblApoEndpoints, NewTumblUrls } from "./NewTumbl.Constants";
import fetch from "node-fetch";
import { HttpResponseHeaders } from "../../../http-helper-constants/HttpResponseHeaders";
import { CFetch } from "../CFetch";
import { JSDOM, BaseOptions, ConstructorOptions } from "jsdom";
import * as HttpAgent from "http-agent";
import request from "request";
import { NewTumblApiResponse } from "./NewTumbl.LoginResponse";
import { IHaveAUsernameAndPasswordCredential } from "../../../http-credentials/src/IHaveAUsernameAndPasswordCredential";
import { NewTumblWithCookieJar } from "./NewTumbl.CookieJar";
import { default as JQuery } from 'jquery';

const jQueryify: JQuery = require('jqueryify');


export class NewTumblLogin extends NewTumblWithCookieJar implements IHaveAUsernameAndPasswordCredential {
    private _credentials: UsernameAndPasswordCredentials;
    public get credentials(): UsernameAndPasswordCredentials {
        return this._credentials;
    }

    constructor(credentials: UsernameAndPasswordCredentials) {
        super();
        this._credentials = credentials;
    }

    protected headers: { [key: string]: string } = {
        [HttpRequestHeaders.UserAgent]: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome",
        [HttpRequestHeaders.Accept]: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        [HttpRequestHeaders.AcceptEncoding]: "gzip, deflate, br",
        [HttpRequestHeaders.AcceptLanguage]: "en-US,en;q=0.9",
        [HttpRequestHeaders.CacheControl]: "max-age=0",
        [HttpRequestHeaders.Connection]: "keep-alive"
    };

    protected jsdomBaseOptions:BaseOptions = {
        "runScripts": "dangerously",
        "resources": "usable",
        "referrer": NewTumblUrls.BaseUrl,
        "cookieJar": this.CookieJar,
        "userAgent": this.headers[HttpRequestHeaders.UserAgent],
        "virtualConsole": new JSDOM().window.virtualConsole
    }

    protected jsDomConstructorOptions:ConstructorOptions = {
        ...this.jsdomBaseOptions,
        "pretendToBeVisual": true
    }


    /**
     * @description      : 
     * @author           : 
     * @group            : 
     * @created          : 16/04/2023 - 06:56:45
     */
    public async login() {
        var homepage = new JSDOM(await (await fetch(NewTumblUrls.SignIn)).text(), {...this.jsDomConstructorOptions, "url":NewTumblUrls.SignIn, "includeNodeLocations": true});
        var jqHomepage = jQueryify(homepage.window);
        var usernameBox = jqHomepage("input['type'=='text' && 'placeholder' == 'Email Address']") as HTMLInputElement;
        var passwrdBox = jqHomepage.find<HTMLInputElement>("input['type'=='text' && 'placeholder' == 'Password']") as HTMLInputElement;
        usernameBox. = this._credentials.username;
        passwrdBox.value = this._credentials.password;
        usernameBox.dispatchEvent(new Event("input"));
        passwrdBox.dispatchEvent(new Event("input"));
        var loginButton: HTMLButtonElement = jqHomepage("button[type='submit']");
        loginButton.click();
        homepage.window.
    }

    /* 
    private _sessionToken: string = "";
    public get sessionToken(): string { return this._sessionToken; }

    public async login(): Promise<string> {
        var requestBodyJson = JSON.stringify({
            "Params": [
                "[{IPADDRESS}]",
                null,
                this._credentials.username,
                this._credentials.password
            ]
        });
        var requestBody = "json=" + encodeURIComponent(requestBodyJson);
        var response = await fetch(NewTumblUrls.ApiRw + NewTumblApoEndpoints.Login,
            {
                method: HttpMethods.Post,
                headers: {
                    [HttpRequestHeaders.ContentType]: ContentTypes.ApplicationXWwwFormUrlencoded,
                    [HttpRequestHeaders.Origin]: NewTumblUrls.BaseUrl,
                    [HttpRequestHeaders.Referer]: NewTumblUrls.BaseUrl,
                    'HOST': new URL(NewTumblUrls.ApiRw + NewTumblApoEndpoints.Login).host,
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': 'macOS'
                },
                body: requestBody
            });
        console.log(requestBodyJson)
        console.log(requestBody)
        var responseJson = await response.text();
        console.log(responseJson);
        var loginResponse = JSON.parse(responseJson) as NewTumblApiResponse;
        console.log(response.headers.get("set-cookie"));
        return this._sessionToken = loginResponse.aResultSet[0].aRow[0].szSessionToken;
    }

    private _affinity: number|undefined = undefined;
    public get affinity(): number {
        this._affinity =
            this._affinity != undefined ?
                this._affinity :
                this.CookieJar.getCookieString("Affinity") != undefined ?
                    new Number(this.CookieJar.getCookieStringSync("Affinity")).valueOf() :
                    Math.floor(Math.random() * 1000000000000000000);
        this.CookieJar.setCookieSync("Affinity=" + this._affinity, NewTumblUrls.BaseUrl, this.SetCookieOptions);
        return this._affinity;
    }

    private _searchSession: number|undefined = undefined;
    public get searchSession(): number {
        this._searchSession =
            this._searchSession != undefined ?
                this._searchSession :
                this.CookieJar.getCookieString("SearchSession") != undefined ?
                    new Number(this.CookieJar.getCookieStringSync("SearchSession")).valueOf() :
                    Math.floor(Math.random() * 1000000000000000000);
        this.CookieJar.setCookieSync("SearchSession=" + this._affinity, NewTumblUrls.BaseUrl, this.SetCookieOptions);
        return Number(this._searchSession).valueOf();
    }*/
}
