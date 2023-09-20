import { actorInTheSpotlight } from '@serenity-js/core'
import { LastResponse } from '@serenity-js/rest'

import { LoginResponse } from '../dtos/responses/loginResponse'

export const loginQuestion = {
    getLoginResponse: async() : Promise <LoginResponse> => {
        return await actorInTheSpotlight().answer(LastResponse.body<LoginResponse>());
    }
}