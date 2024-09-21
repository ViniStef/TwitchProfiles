import axios from 'axios';
import { modifyToken } from '../../server.js';

export const makeAPIRequest = async (baseUrl, endpoint, method = 'GET', params = {}, additionalHeaders = {}, token = null, clientId = null, clientSecret = null) => {
    const url = `${baseUrl}/${endpoint}`;
    try {
        let headers = {
            'Content-type': 'application/json',
            ...additionalHeaders,
        }
        if (baseUrl.includes("twitch.tv")) {
            headers = {
                'Authorization': `Bearer ${token}`,
                'Client-Id': clientId,
                ...additionalHeaders,
            }
        }
        
        const config = {
            method,
            url,
            params,
            
            headers,
        }

        if (method === 'GET') {
            config.params = params;
        } else if (method === 'POST') {
            if (url.includes('oauth2/token')) {
                config.params = params;
            } else {
                config.data = data;
            }
        }
        const response = await axios(config);
        return response.data;

    } catch (error) { 
        if (error.response.status === 401 && baseUrl.includes('twitch.tv')) {
            const tokenRequestParams = {
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': 'client_credentials',
            }
            const twitchTokenUrl = `https://id.twitch.tv`;
            const tokenEndpoint = "oauth2/token";

            try {
                const tokenData = await makeAPIRequest(twitchTokenUrl, tokenEndpoint, 'POST', tokenRequestParams)
                let newToken = tokenData.access_token;
                modifyToken(newToken)
                token = newToken;

                const retryConfig = {
                    method,
                    url,
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                        'Client-Id': `${clientId}`,
                        ...additionalHeaders,
                    },
                    params,
                }
                const retryResponse = await axios(retryConfig);
                return retryResponse.data;

            } catch (tokenError) {
                console.error('Error fetching new token: ', tokenError);
                throw tokenError;
            }
        } else {
            console.log("Internal server error.");
            throw error;
        }
    }

}