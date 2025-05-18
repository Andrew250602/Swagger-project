import { UserActionTypes } from "../../../constants/action/user";

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch({ type: UserActionTypes.FETCH_USERS_REQUEST });

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UserActionTypes.FETCH_USERS_FAILURE, error: error.message });
        }
    };
};