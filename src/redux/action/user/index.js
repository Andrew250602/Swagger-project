import { UserActionTypes } from "../../../constants/action/user";
import {requestFetch} from "../../../ultil/request/index"
import {signInUrl} from "../../../constants/url/index"
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
            dispatch({ type: UserActionTypes.FETCH_USERS_FAILURE, error: error.message });
        }
    };
};
export const logoutAction = () => {
    return {
        type: UserActionTypes.LOGOUT,
    };
};