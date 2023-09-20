import { Ensure, equals } from '@serenity-js/assertions';
import { actorInTheSpotlight,TestCompromisedError } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

import { apiQuestion } from '../questions/default/apiQuestion'
import { assertEnsure } from './assertEnsure';

export const apiAsserts = {
    statusCode: async(expectedStatusCode : number): Promise<void> => {
        const lastResponseStatusCode : number = await apiQuestion.getStatusCode();
        if(assertEnsure.that.isEqualTo(lastResponseStatusCode, expectedStatusCode)) {
            await actorInTheSpotlight().attemptsTo(
                Ensure.that(LastResponse.status(), equals(expectedStatusCode))
                    .otherwiseFailWith(TestCompromisedError, 'The status code is not the expected!')
            );
        }
    }
}