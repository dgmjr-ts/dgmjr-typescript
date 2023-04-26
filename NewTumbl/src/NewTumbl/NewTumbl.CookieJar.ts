/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 06:55:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/
import { Cookie, CookieJar } from "tough-cookie";
import { FileCookieStore } from "tough-cookie-file-store";
import { UsernameAndPasswordCredentials } from "../../../http-credentials/src/UsernameAndPasswordCredentials";
import { IHaveAUsernameAndPasswordCredential } from "../../../http-credentials/src/IHaveAUsernameAndPasswordCredential";
import { NewTumblUrls } from "./NewTumbl.Constants";

export abstract class NewTumblWithCookieJar implements IHaveAUsernameAndPasswordCredential {
    public abstract get credentials(): UsernameAndPasswordCredentials;

    public get SetCookieOptions(): CookieJar.SetCookieOptions & Cookie.Properties {
        return {
            http: false,
            secure: true,
            domain: NewTumblUrls.BaseUrl,
            path: "/",
            sameSite: "strict",
            "maxAge": "Infinity",
            "expires": new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        };
    };

    private _cookieJar: CookieJar|null  = null;
    public get CookieJar(): CookieJar {
        return this._cookieJar = this._cookieJar ?? new CookieJar(new FileCookieStore(`~/.newtumbl/${this.credentials.username}.json`));
    }

    private _selectedBlog: number = 0;

    public set selectedBlog(value: number) {
        this._selectedBlog = value;
        this.CookieJar.setCookieSync("ActiveBlog", this._selectedBlog.toString(), this.SetCookieOptions);
    }

    public get selectedBlog(): number {
        return this._selectedBlog != undefined && this._selectedBlog != 0 ?
            this._selectedBlog :
            this.CookieJar.getCookiesSync("ActiveBlog", this.SetCookieOptions).length > 0 && parseInt(this.CookieJar.getCookiesSync("ActiveBlog", this.SetCookieOptions)[0].value) != 0 ?
                this._selectedBlog = parseInt(this.CookieJar.getCookiesSync("ActiveBlog", this.SetCookieOptions)[0].value) :
                0;
    }


}
