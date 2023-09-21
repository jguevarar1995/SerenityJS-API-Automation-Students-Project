import { StudentPayload } from '../studentPayload';

export const StudentBuilder = (
    // eslint-disable-next-line unicorn/prevent-abbreviations
    docNumber: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    grade: number,
    course: string,
    score: number
): StudentPayload => ({
    docNumber,
    firstName,
    lastName,
    email,
    phone,
    grade,
    course,
    score
});