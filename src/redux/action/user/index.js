import { UserActionTypes } from "../../../constants/action/user";
import { requestFetch } from "../../../ultil/request/index";
import { signInUrl, signOutUrl, startRefreshTokenUrl } from "../../../constants/url/index";

export const submitFormAction = (data) => {
    return async (dispatch) => {
        dispatch({ type: UserActionTypes.FETCH_USERS_REQUEST });
        try {
            const responseData = await requestFetch(signInUrl, {
                method: "POST",
                body: JSON.stringify(data),
            });
            dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: responseData });
        } catch (error) {
            if (error.message === 'Unable to refresh token') {
                dispatch(logoutAction());
            }
            dispatch({ type: UserActionTypes.FETCH_USERS_FAILURE, error: error.message });
        }
    };
};

export const refreshAccessTokenAction = (refreshToken) => {
    return async (dispatch) => {
        try {
            const response = await requestFetch(startRefreshTokenUrl, {
                method: 'POST',
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Refresh token expired');
            }

            const { accessToken, refreshToken: newRefreshToken } = await response.json();
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            dispatch({
                type: UserActionTypes.UPDATE_TOKENS,
                payload: { accessToken, refreshToken: newRefreshToken },
            });
        } catch (error) {
            dispatch(logoutAction());
            window.location.href = '/login';
        }
    };
};

export const logoutAction = (data) => {
    return async (dispatch) => {
        dispatch({ type: UserActionTypes.FETCH_USERS_REQUEST });
        try {
            await requestFetch(signOutUrl, {
                method: "POST",
                body: JSON.stringify(data),
            });
            dispatch({
                type: UserActionTypes.LOGOUT
            })
        } catch (error) {
            dispatch({ type: UserActionTypes.FETCH_USERS_FAILURE, error: error.message });
        }
    };
};