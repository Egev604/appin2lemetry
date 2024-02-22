import { Credentials } from '../models/Credentials';

const request = async (endpoint: string, options?: RequestInit | undefined) => {
    try {
        const response = await fetch('http://localhost:3001' + endpoint, options);
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            console.log(response.status);
            return;
        }
    } catch (e) {
        console.log((e as Error).message);
    }
};
const postRequest = async (endpoint: string, body: object) => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return await request(endpoint, options);
};

export const login = async (credentials: Credentials) => {
    return await postRequest('/auth/login', credentials);
};

export const signup = async (credentials: Credentials) => {
    return await postRequest('/auth/signup', credentials);
};
export const requestAccessToken = async (accessToken: string) => {
    return await postRequest('/auth/access', { accessToken });
};
export const requestRefreshToken = async (refreshToken: string) => {
    return await postRequest('/auth/refresh', { refreshToken });
};
