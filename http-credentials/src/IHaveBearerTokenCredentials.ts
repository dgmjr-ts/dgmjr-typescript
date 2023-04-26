import {BearerTokenCedentials} from "./BearerTokenCredentials";

export interface IHaveBearerTokenCredentials {
    get credentials(): BearerTokenCredentials & ICredentials;
}