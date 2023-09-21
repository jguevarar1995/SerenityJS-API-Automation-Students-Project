import { DataTable, Then, When } from '@cucumber/cucumber';

import { studentInteractions } from '../../src/interactions/studentInteractions';
import { studentTask } from '../../src/tasks/studentTask';

When('registers a new student with faker data', async () => {
    await studentInteractions.postStudentWithFaker();
});

When('registers a new student with data table', async () => {
    await studentInteractions.postStudentWithFaker();
});

When('registers a new student with:', async (studentData : DataTable) => {
    const t: string[] = studentData.raw().slice(1).map(row => row[0]);
    t.forEach((item) => {
        console.log(item);
    })
});

Then('the student is successfully registered', async () => {
    await studentTask.validateSuccessStudentRegisterResponse();
});