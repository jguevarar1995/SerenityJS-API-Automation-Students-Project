import { equals } from '@serenity-js/assertions';
import { actorInTheSpotlight } from '@serenity-js/core';

import { customReportMessages } from '../constants/customReportMessages';
import { httpCodes } from '../constants/httpCodes';
import { StudentMessageResponse } from '../dtos/responses/studentMessageResponse';
import { studentQuestion } from '../questions/studentQuestion';
import { apiAsserts } from './apiAsserts';
import { assertEnsure } from './assertEnsure';
import { BussinessEnsure } from './businessEnsure';

export const studentTask = {
    validateSuccessStudentRegisterResponse: async (): Promise<void> => {
        await apiAsserts.statusCode(httpCodes.OK);

        const isNotEmptyResponseBody = assertEnsure.that.isNotEqualTo(await studentQuestion.getStudentMessageResponse(), {});
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isNotEmptyResponseBody, equals(true), customReportMessages.RESPONSE_BODY_IS_NOT_EMPTY, customReportMessages.RESPONSE_BODY_IS_EMPTY));

        const studentMessageResponse: StudentMessageResponse = await studentQuestion.getStudentMessageResponse();

        const isStudentRegistered = assertEnsure.that.startsWith(studentMessageResponse.message[0], 'Estudiante')
            && assertEnsure.that.endsWith(studentMessageResponse.message[0], 'creado');
        await actorInTheSpotlight().attemptsTo(BussinessEnsure.that(isStudentRegistered, equals(true), customReportMessages.STUDENT_IS_REGISTERED, customReportMessages.STUDENT_IS_NOT_REGISTERED));
    }
}