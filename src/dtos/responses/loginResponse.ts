export interface LoginResponse {
    message: string,
    status: number,
    user: UserData
}

export interface UserData {
    id: number,
    email: string,
    role_id: number
}