/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 05:58:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/

import { ICredentials } from './ICredentials';

export class BearerTokenCredentials implements ICredentials
{
    private _token: string|undefined;

    public BearerTokenCredentials(token: string|undefined = undefined) 
    {
        this._token = token;
    }

    public get Token(): string|undefined { return this._token; }
    public set Token(value: string|undefined) { this._token = value; }
}