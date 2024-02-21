import { Credentials } from '../models/Credentials';

const request = async (url: string, options?: RequestInit | undefined) => {
    try {
        const response = await fetch(url, options);
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
