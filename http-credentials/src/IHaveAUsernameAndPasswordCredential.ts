/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 05:38:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/


import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";

export interface IHaveAUsernameAndPasswordCredential {
    get credentials(): UsernameAndPasswordCredentials & ICredentials;
}
