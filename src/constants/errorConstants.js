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

    DELETE_USER_ERROR_LOG: 'Error deleting user:',
    DELETE_USER_FAILED_MESSAGE: 'Failed to delete user',
    DELETE_USER_GENERIC_ERROR: 'Error deleting user: Failed to delete user',
    REFRESH_TOKEN_NOT_FOUND_ERROR_TITLE: 'Refresh token not found',
    TOKEN_VALID: 'Token is valid.',
    TOKEN_INVALID: 'Token is invalid or expired.',
    ERROR_REMOVING_REFRESH_TOKEN: 'Error when removing refresh token:',
}


module.exports =
    errorConstants
