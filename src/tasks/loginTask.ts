import { equals } from '@serenity-js/assertions';
import { actorInTheSpotlight } from '@serenity-js/core';

import { customReportMessages } from '../constants/customReportMessages';
import { httpCodes } from '../constants/httpCodes';
import { responseMessages } from '../constants/responseMessages';
import { LoginResponse } from '../dtos/responses/loginResponse';
import { loginQuestion } from '../questions/loginQuestion';
import { apiAsserts } from './apiAsserts';
import { assertEnsure } from './assertEnsure';
import { BussinessEnsure } from './businessEnsure';

export const loginTask = {
    validateSuccessLoginResponse: async(email: string): Promise<void> => {
        await apiAsserts.statusCode(httpCodes.OK);
        
        const isNotEmptyResponseBody = assertEnsure.that.isNotEqualTo(await loginQuestion.getLoginResponse(), {});
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isNotEmptyResponseBody, equals(true), customReportMessages.RESPONSE_BODY_IS_NOT_EMPTY, customReportMessages.RESPONSE_BODY_IS_EMPTY));

        const loginResponse: LoginResponse = await loginQuestion.getLoginResponse();

        const isExpectedUserData = assertEnsure.that.isEqualTo(loginResponse.user.email, email);
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isExpectedUserData, equals(true), customReportMessages.USER_EXPECTED_DATA, customReportMessages.USER_NON_EXPECTED_DATA));
    },

    validateUnauthorizedLoginResponse: async(): Promise<void> => {
        await apiAsserts.statusCode(httpCodes.UNAUTHORIZED);

        const loginResponse: LoginResponse = await loginQuestion.getLoginResponse();

        const areCredentialsInvalid = assertEnsure.that.isEqualTo(loginResponse.message[0], responseMessages.UNAUTHORIZED_LOGIN_RESPONSE_MESSAGE);
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(areCredentialsInvalid, equals(true), customReportMessages.USER_IS_UNAUTHORIZED, customReportMessages.USER_IS_AUTHORIZED_OR_DOES_NOT_EXISTS));
    },

    validateUserNotFoundLoginResponse: async(): Promise<void> => {
        await apiAsserts.statusCode(httpCodes.NOT_FOUND);

        const loginResponse: LoginResponse = await loginQuestion.getLoginResponse();

        const isUserNotFound = assertEnsure.that.isEqualTo(loginResponse.message[0], responseMessages.USER_NOT_FOUND_RESPONSE_MESSAGE);
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isUserNotFound, equals(true), customReportMessages.USER_IS_NOT_FOUND, customReportMessages.USER_IS_FOUND));
    }
}
