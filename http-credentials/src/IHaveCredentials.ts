import {ICredentials} from "./ICredentials";

export interface IHaveCredentials {
    get credentials(): ICredentials;
}