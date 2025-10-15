import { getToken } from './auth';

export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = getToken();

    if(!token) {
        throw new Error('No token found, user might not be logged in');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {...options, headers });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'API request failed!');
    }

    return response.json();
}