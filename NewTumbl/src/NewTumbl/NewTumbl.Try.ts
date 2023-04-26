/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 16/04/2023 - 06:10:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2023
    * - Author          : 
    * - Modification    : 
**/
import { env } from "process";
import { UsernameAndPasswordCredentials } from "../../../http-credentials/index";
import { NewTumbl } from "./NewTumbl";

(async () => {
    var loginToken = await new NewTumbl(new UsernameAndPasswordCredentials(env.NEWTUMBL_USERNAME, env.NEWTUMBL_PASSWORD)).login();
    console.log("Login token: " + loginToken);
})();
