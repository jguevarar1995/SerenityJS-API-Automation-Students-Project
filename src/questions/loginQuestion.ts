import { actorInTheSpotlight } from "@serenity-js/core"
import { LoginResponse } from "../dtos/responses/loginResponse"
import { LastResponse } from "@serenity-js/rest"

export const loginQuestion = {
    getLoginResponse: async() : Promise <LoginResponse> => {
        return await actorInTheSpotlight().answer(LastResponse.body<LoginResponse>());
    }
}