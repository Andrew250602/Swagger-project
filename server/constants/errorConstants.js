const errorConstants = {
    MISSING_REQUIRED_FIELDS: 'Vui lòng cung cấp đầy đủ thông tin: code, lcCode, name, password.',
    CREATE_USER_FAILED: 'Đã có lỗi xảy ra khi tạo người dùng.',
    CREATE_USER_ERROR_TITLE: 'Lỗi khi tạo người dùng:',
    CREATE_USER_DB_ERROR: 'Lỗi khi truy vấn tạo người dùng:',
    USER_IS_EXISTED: "Người dùng đã tồn tại",
    USER_IS_NOT_EXISTED: "Người dùng chưa tồn tại",
    USER_CHECK_ERROR: 'Lỗi khi kiểm tra người dùng đã tồn tại.',

    DATABASE_TABLES_READY: 'Các bảng cơ sở dữ liệu đã được kiểm tra và sẵn sàng.',
    DATABASE_SEEDING_SUCCESS: 'Dữ liệu mẫu đã được thêm vào cơ sở dữ liệu.',
    DATABASE_SEEDING_FAILED: 'Có lỗi xảy ra trong quá trình thêm dữ liệu mẫu.',
    DATABASE_MIGRATION_FAILED: 'Có lỗi xảy ra trong quá trình tạo bảng. Ứng dụng có thể không hoạt động đúng.',

    SIGN_IN_ERROR_TITLE: "Đăng nhập không thành công!",
    SIGN_IN_FAILED: "Đăng nhập bị lỗi",
    USER_NOT_FOUND_ERROR_TITLE: 'Lỗi khi tìm người dùng:',
    INVALID_CREDENTIALS: 'Thông tin đăng nhập không hợp lệ.',
    MENU_SEARCH_ERROR: 'Lỗi khi tìm kiếm menu.',

    UNAUTHORIZED_TOKEN_MISSING: 'Unauthorized: Token không được cung cấp.',
    FORBIDDEN_INVALID_TOKEN: 'Forbidden: Token không hợp lệ.',

    DELETE_USER_ERROR_LOG: 'Lỗi khi xóa người dùng:',
    DELETE_USER_FAILED_MESSAGE: 'Xóa người dùng không thành công',
    DELETE_USER_GENERIC_ERROR: 'Lỗi khi xóa người dùng: Xóa người dùng không thành công',
    REFRESH_TOKEN_NOT_FOUND_ERROR_TITLE: 'Refresh token không được tìm thấy',
    TOKEN_VALID: 'Token hợp lệ.',
    TOKEN_INVALID: 'Token không hợp lệ hoặc đã hết hạn.',
    ERROR_REMOVING_REFRESH_TOKEN: 'Lỗi khi xóa refresh token:',

    ADD_ROLE_ERROR_TITLE: "Lỗi khi thêm vai trò:",
    ADD_ROLE_FAILED: "Không thể thêm vai trò do lỗi nội bộ.",

    DELETE_ALL_USERS_ERROR: "Lỗi xảy ra khi cố gắng xóa tất cả người dùng.",
    DELETE_ALL_USERS_FAILED: "Xóa tất cả người dùng không thành công.",
    GET_ALL_USERS_FAILED: "Lấy tất cả người dùng không thành công.",
    NO_USERS_FOUND: "Không tìm thấy người dùng để xóa.",
    GET_ALL_USERS_ERROR: "Lỗi xảy ra khi cố gắng lấy tất cả người dùng.",
    UPDATE_TOKEN_ERROR_TITLE: 'Lỗi khi update token:',
    NOT_FOUND: 'Không tìm thấy. ',
    PERMISSION_USER_FAILED: 'Phân quyền người dùng bị lỗi. '

}
const errorConstantsEn = {
    MISSING_REQUIRED_FIELDS: 'Please provide all required information: code, lcCode, name, password.',
    CREATE_USER_FAILED: 'An error occurred while creating the user.',
    CREATE_USER_ERROR_TITLE: 'Error while creating user:',
    CREATE_USER_DB_ERROR: 'Error when querying to create user:',
    USER_IS_EXISTED: "User already exists",
    USER_IS_NOT_EXISTED: "User does not exist",
    USER_CHECK_ERROR: 'Error checking if user exists.',

    DATABASE_TABLES_READY: 'Database tables have been checked and are ready.',
    DATABASE_SEEDING_SUCCESS: 'Sample data has been added to the database.',
    DATABASE_SEEDING_FAILED: 'An error occurred while adding sample data.',
    DATABASE_MIGRATION_FAILED: 'An error occurred during table creation. The application may not function correctly.',

    SIGN_IN_ERROR_TITLE: "Sign-in unsuccessful!",
    SIGN_IN_FAILED: "Sign-in failed",
    USER_NOT_FOUND_ERROR_TITLE: 'Error while finding user:',
    INVALID_CREDENTIALS: 'Invalid login credentials.',
    MENU_SEARCH_ERROR: 'Error searching for menu.',

    UNAUTHORIZED_TOKEN_MISSING: 'Unauthorized: Token not provided.',
    FORBIDDEN_INVALID_TOKEN: 'Forbidden: Invalid token.',

    DELETE_USER_ERROR_LOG: 'Error deleting user:',
    DELETE_USER_FAILED_MESSAGE: 'Failed to delete user',
    DELETE_USER_GENERIC_ERROR: 'Error deleting user: Failed to delete user',
    REFRESH_TOKEN_NOT_FOUND_ERROR_TITLE: 'Refresh token not found',
    TOKEN_VALID: 'Token is valid.',
    TOKEN_INVALID: 'Token is invalid or expired.',
    ERROR_REMOVING_REFRESH_TOKEN: 'Error when removing refresh token:',

    ADD_ROLE_ERROR_TITLE: "Error while adding role:",
    ADD_ROLE_FAILED: "Failed to add role due to an internal error.",

    DELETE_ALL_USERS_ERROR: "Error occurred while trying to delete all users.",
    DELETE_ALL_USERS_FAILED: "Failed to delete all users.",
    GET_ALL_USERS_FAILED: "Failed to fetch all users.",
    NO_USERS_FOUND: "No users found to delete.",
    GET_ALL_USERS_ERROR: "Error occurred while trying to fetch all users.",
}
module.exports =
    errorConstants