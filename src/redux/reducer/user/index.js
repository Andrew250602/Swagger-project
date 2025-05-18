import { UserActionTypes } from "../../../constants/action/user";

const initialState = {
    loading: false,
    users: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case UserActionTypes.FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default userReducer;