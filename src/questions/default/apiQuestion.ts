import { actorInTheSpotlight } from "@serenity-js/core"
import { LastResponse } from "@serenity-js/rest"

export const apiQuestion = {
    getStatusCode: async () : Promise<number> => {
        return await actorInTheSpotlight().answer(LastResponse.status());
    }
}