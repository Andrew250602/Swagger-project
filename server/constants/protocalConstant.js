const protocolConstants = {
    SUCCESS: 200,
    CREATED: 201, // Phản hồi cho việc tạo thành công một tài nguyên
    ACCEPTED: 202, // Yêu cầu đã được chấp nhận để xử lý, nhưng việc xử lý chưa hoàn tất
    NO_CONTENT: 204, // Server đã xử lý thành công yêu cầu nhưng không trả về nội dung

    REDIRECT: 302, // Chuyển hướng tạm thời
    PERMANENT_REDIRECT: 301, // Chuyển hướng vĩnh viễn

    BAD_REQUEST: 400, // Yêu cầu không hợp lệ (ví dụ: lỗi cú pháp, thiếu tham số)
    UNAUTHORIZED: 401, // Cần xác thực
    FORBIDDEN: 403, // Không có quyền truy cập tài nguyên
    NOT_FOUND: 404, // Không tìm thấy tài nguyên
    METHOD_NOT_ALLOWED: 405, // Phương thức HTTP không được phép cho tài nguyên này
    CONFLICT: 409, // Xung đột với trạng thái hiện tại của tài nguyên
    UNPROCESSABLE_ENTITY: 422, // Server hiểu request nhưng không thể xử lý do lỗi ngữ nghĩa

    INTERNAL_SERVER_ERROR: 500, // Lỗi máy chủ nội bộ
    BAD_GATEWAY: 502, // Gateway nhận được phản hồi không hợp lệ từ server upstream
    SERVICE_UNAVAILABLE: 503, // Server hiện không khả dụng
    GATEWAY_TIMEOUT: 504, // Gateway timeout
    INTERNAL_VALID: 500 // Bạn đã định nghĩa nó là 500, có thể bạn muốn một mã khác cho lỗi validation cụ thể ở server?

}
module.exports = protocolConstants