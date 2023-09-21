import { faker } from '@faker-js/faker'
import { actorInTheSpotlight } from '@serenity-js/core';
import { PostRequest, Send } from '@serenity-js/rest';

import { endpoints } from '../constants/endpoints';
import { StudentBuilder } from '../dtos/payloads/builders/studentBuilder'
import { StudentPayload } from '../dtos/payloads/studentPayload'
import { configs } from '../helpers/configs';

export const studentInteractions = {
    postStudentWithFaker: async (): Promise<void> => {
        const studentPayload: StudentPayload = StudentBuilder(Number.parseInt(faker.finance.accountNumber({ length: 9 })), 
            faker.person.firstName(), faker.person.lastName(), faker.internet.email().toLowerCase(), faker.phone.number('##########'), 
            faker.number.int({ min: 1, max: 11 }), faker.commerce.product(), faker.number.float({ min: 0, max: 10, precision: 0.1 }));
        
        await actorInTheSpotlight().attemptsTo(
            Send.a(
                PostRequest.to(endpoints.STUDENT)
                    .with(JSON.stringify(studentPayload))
                    .using({headers : configs.apiDefaultHeaders})));
    },

    postStudentWithDataTable: async (t: string[][]): Promise<void> => {
        
    }
}