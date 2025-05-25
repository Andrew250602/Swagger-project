import { UserActionTypes } from "../../../constants/action/user";

const initialState = {
    loading: false,
    user: null,
    error: null,
    // Kiểm tra localStorage ngay khi reducer được khởi tạo
    isAuthenticated: !!localStorage.getItem('accessToken'), // true nếu có token, false nếu không
    token: localStorage.getItem('accessToken'), // Lấy token từ localStorage
};


const userReducer = (state = initialState, action) => {
       switch (action.type) {
        case UserActionTypes.FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };

        case UserActionTypes.FETCH_USERS_SUCCESS:
            const { user } = action.payload; // Giả định payload có { user, token }
            localStorage.setItem('accessToken', user.accessToken);
            return {
                ...state,
                loading: false,
                user: user, // <-- Cập nhật user hiện tại
                isAuthenticated: true,
                token: user.accessToken,
                error: null,
            };

        case UserActionTypes.FETCH_USERS_FAILURE:
            localStorage.removeItem('accessToken');
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null, // Reset user khi đăng nhập thất bại
                error: action.error,
            };

        case UserActionTypes.LOGOUT:
            localStorage.removeItem('accessToken');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                error: null,
            };

        default:
            return state;
    }
};

export default userReducer;