import { refreshAccessTokenAction } from "../../redux/action/user";
import {jwtDecode} from "jwt-decode";

export const requestFetch = async (url, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('accessToken');

    if (token) {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
            // Attempt to refresh the token
            try {
                await refreshAccessTokenAction(token);
            } catch (error) {
                console.error("Failed to refresh token", error);
                throw new Error("Authentication error");
            }
        }
    }

    const updatedToken = localStorage.getItem('accessToken');
    if (updatedToken) {
        defaultHeaders['Authorization'] = `Bearer ${updatedToken}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok || token) {
        if (response.status === 401) {
            // Handle unauthorized error
            window.location.url = '/login'
            throw new Error('Unauthorized, redirecting to login');
        }
        throw new Error('Network response was not ok');
    }

    return response.json();
};