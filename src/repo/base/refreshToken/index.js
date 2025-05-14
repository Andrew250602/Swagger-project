const jwt = require('jsonwebtoken');
const pool = require("../../../connect/index")
require('dotenv').config();


class RefreshTokenRepository {
    async generateToken(user) {
        const payload = { name: user.name };
        const expiration = '1d';
        const secret = process.env.JWT_SECRET_KEY;

        const refreshToken = jwt.sign(payload, secret, { expiresIn: expiration });
        return refreshToken;
    }
    async saveToken(data) {
        try {
            const client = await pool.connect();
            const lcCodeValue = 'lc_code';
            const nameValue = 'refresh';
            const activeValue = 2;
            const result = await client.query(
                `INSERT INTO TBL_BASE_REFRESH_TOKEN(code, user_code, access_token, lc_code, name, active)
                 VALUES(1, $1, $2, $3, $4, $5)`,
                [data.user_code, data.access_token, lcCodeValue, nameValue, activeValue]
            );
            client.release();
            return result.rowCount > 0;
        } catch (error) {
            console.error('Lỗi khi lưu refresh token:', error);
            return false;
        }
    }
}
module.exports = RefreshTokenRepository