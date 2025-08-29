import type { AuthTokens } from "~/composables/auth/Auth.interface";
import { CLIENT_ID, CLIENT_SECRET } from "~/composables/api/api.config";
import { useFetchApi } from "~/composables/api/useFetchApi";

interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export const useRefreshTokenService = () => {
    const fetchData = useFetchApi<RefreshTokenResponse>();
    return async (refreshToken: string): Promise<{ tokens: AuthTokens } | undefined> => {
        const response = await fetchData('/oauth2/rest/token', {
            method: 'post',
            body: {
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }
        }, { ignoreErrors: true })

        if (response !== undefined) {
            const { access_token, refresh_token, expires_in } = response as RefreshTokenResponse;
            return {
                tokens: {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    expiresIn: new Date().getTime() + expires_in * 1000,
                }
            }
        }
        return response;
    }  
}