import { requestAccessToken, requestRefreshToken } from '../../api/api';
export async function validTokens(): Promise<boolean> {
    const tokens = getToken();
    if (!tokens) return false;

    try {
        let response = await requestAccessToken(tokens.accessToken);
        if (response && response.accessToken) {
            setToken(response);
            return true;
        } else {
            response = await requestRefreshToken(tokens.refreshToken);
            if (response && response.refreshToken) {
                setToken(response);
                return true;
            }
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
    return false;
}
export const getToken = (): { accessToken: string; refreshToken: string } | null => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        return { accessToken: parsedTokens.accessToken, refreshToken: parsedTokens.refreshToken };
    }
    return null;
};

export const setToken = (tokens: object) => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
};
