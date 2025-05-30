import { UserActionTypes } from "../../../constants/action/user";

const initialState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    token: localStorage.getItem('accessToken'),
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };

        case UserActionTypes.FETCH_USERS_SUCCESS:
            const { user } = action.payload;
            localStorage.setItem('accessToken', user.accessToken);
            localStorage.setItem('refreshToken', user.refreshToken);
            localStorage.setItem('name', user.name)
            return {
                ...state,
                loading: false,
                user,
                isAuthenticated: true,
                token: user.accessToken,
                error: null,
            };

        case UserActionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null,
                error: action.error,
            };

        case UserActionTypes.LOGOUT:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('name');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                error: null,
            };

        case UserActionTypes.UPDATE_TOKENS:
            const { accessToken, refreshToken } = action.payload;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return {
                ...state,
                token: accessToken,
                error: null,
            };

        default:
            return state;
    }
};

export default userReducer;