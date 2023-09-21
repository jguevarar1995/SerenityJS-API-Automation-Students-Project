import { actorInTheSpotlight } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

import { StudentMessageResponse } from '../dtos/responses/studentMessageResponse';

export const studentQuestion = {
    getStudentMessageResponse: async() : Promise <StudentMessageResponse> => {
        return await actorInTheSpotlight().answer(LastResponse.body<StudentMessageResponse>());
    }
}