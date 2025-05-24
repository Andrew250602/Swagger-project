import { UserActionTypes } from "../../../constants/action/user";
import { signInUrl } from "../../../constants/url";
import { requestFetch } from "../../../ultil/request";

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