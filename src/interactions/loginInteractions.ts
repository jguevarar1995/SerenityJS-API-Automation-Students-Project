import { actorInTheSpotlight } from '@serenity-js/core';
import { PostRequest, Send } from '@serenity-js/rest';

import { endpoints } from '../constants/endpoints';
import { LoginBuilder } from '../dtos/payloads/builders/loginBuilder'
import { LoginPayload } from '../dtos/payloads/loginPayload'
import { configs } from '../helpers/configs';
import { encrypt } from '../helpers/encrypt'

export const loginInteractions = {
    postLogin: async(email: string, password: string): Promise<void> => {
        const loginPayload: LoginPayload = LoginBuilder(email, encrypt(password));

        await actorInTheSpotlight().attemptsTo(
            Send.a(
                PostRequest.to(endpoints.LOGIN)
                .with(JSON.stringify(loginPayload))
                .using({headers : configs.apiDefaultHeaders})));
    }
}