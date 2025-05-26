import { refreshAccessTokenAction } from "../../redux/action/user";


export const requestFetch = async (url, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Check if token is expired
    if (token) {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
            // If the token is expired, try to refresh it
            await refreshAccessTokenAction(token);
        }
    }

    // Update headers with the latest token
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

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

