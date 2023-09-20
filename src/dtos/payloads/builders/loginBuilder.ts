import { LoginPayload } from "../loginPayload";

export const LoginBuilder = (
    email: string,
    password: string
): LoginPayload => ({
    email,
    password
});