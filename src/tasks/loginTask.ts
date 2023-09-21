import { actorInTheSpotlight } from "@serenity-js/core";
import { loginQuestion } from "../questions/loginQuestion";
import { assertEnsure } from "./assertEnsure";
import { BussinessEnsure } from "./businessEnsure";
import { equals } from "@serenity-js/assertions";
import { customReportMessages } from "../constants/customReportMessages";
import { httpCodes } from "../constants/httpCodes";
import { apiAsserts } from "./apiAsserts";

export const loginTask = {
    validateSuccessLoginResponse: async(email: string) => {
        await apiAsserts.statusCode(httpCodes.OK);
        
        const isNotEmptyResponseBody = assertEnsure.that.isNotEqualTo(await loginQuestion.getLoginResponse(), {});
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isNotEmptyResponseBody, equals(true), customReportMessages.LOGIN_RESPONSE_BODY_IS_NOT_EMPTY, customReportMessages.LOGIN_RESPONSE_BODY_IS_EMPTY));

        const isExpectedUserData = assertEnsure.that.isEqualTo((await loginQuestion.getLoginResponse()).user.email, email);
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isExpectedUserData, equals(true), customReportMessages.USER_EXPECTED_DATA, customReportMessages.USER_NON_EXPECTED_DATA));
    }
}