/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 05:28:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/

import { ICredentials } from './ICredentials';

export class UsernameAndPasswordCredentials implements ICredentials {
    private _username: string = "";
    private _password: string = "";

    public get username(): string {
        return this._username;
    }

    public get password(): string {
        return this._password;
    }

    constructor(...arr: any[]) {
        if (arr.length === 2) {
            this._username = arr[0];
            this._password = arr[1];
        }
    }
}
