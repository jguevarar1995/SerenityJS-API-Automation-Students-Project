import { LoginBuilder } from "../dtos/payloads/builders/loginBuilder"
import { actorInTheSpotlight } from "@serenity-js/core";
import { LoginPayload } from "../dtos/payloads/loginPayload"
import { encrypt } from "../helpers/encrypt"
import { LastResponse, PostRequest, Send } from "@serenity-js/rest";
import { endpoints } from "../constants/endpoints";
import { LoginResponse } from "../dtos/responses/loginResponse";
import { configs } from "../helpers/configs";

export const loginInteractions = {
    postLogin: async(email: string, password: string) => {
        const loginPayload: LoginPayload = LoginBuilder(email, encrypt(password));

        await actorInTheSpotlight().attemptsTo(
            Send.a(
                PostRequest.to(endpoints.LOGIN)
                .with(JSON.stringify(loginPayload))
                .using({headers : configs.apiDefaultHeaders})));
    }
}