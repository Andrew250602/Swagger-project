const jwt = require('jsonwebtoken');
const pool = require("../../../connect/index");
const errorConstants = require('../../../constants/errorConstants');
require('dotenv').config();

class RefreshTokenRepository {

    async generateAccessToken(userPayload) {
        const accessTokenPayload = { name: userPayload.name };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const accessToken = jwt.sign(accessTokenPayload, secret, { expiresIn: '30s' });
        return accessToken;
    }

    async createAndStoreRefreshToken(userPayload) {
        const refreshTokenPayload = { name: userPayload.name };
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const refreshToken = jwt.sign(refreshTokenPayload, secret, { expiresIn: '30s' });
        return refreshToken;
    }
    async saveToken(data) {
        try {
            const client = await pool.connect();
            const lcCodeValue = 'lc_code';
            const activeValue = 2;
            const result = await client.query(
                `INSERT INTO TBL_BASE_REFRESH_TOKEN(code, user_code, access_token, lc_code, name, active, refresh_token)
                 VALUES($1, $1, $2, $3, $4, $5, $6)`,
                [data.code, data.accessToken, lcCodeValue, data.name, activeValue, data.refreshToken]
            );
            client.release();
            return result.rowCount > 0;

        } catch (error) {
            console.error('Lỗi khi lưu  token:', error);
            return false;
        }
    }

    async updateToken(data) {
        try {
            const client = await pool.connect();
            const lcCodeValue = 'lc_code';
            const activeValue = 2;
            const result = await client.query(
                `UPDATE TBL_BASE_REFRESH_TOKEN
                    SET code = $1,
                        user_code = $1,
                        access_token = $2,
                        lc_code = $3,
                        name = $4,
                        active = $5,
                        refresh_token = $6`,
                [data.code, data.accessToken, lcCodeValue, data.name, activeValue, data.refreshToken]
            );
            client.release();
            return result.rowCount > 0;

        } catch (error) {
            console.error(errorConstants.UPDATE_TOKEN_ERROR_TITLE, error);
            return false;
        }
    }
    async removeToken(data) {
        try {
            const client = await pool.connect();
            const result = await client.query(
                `DELETE FROM TBL_BASE_REFRESH_TOKEN
            WHERE user_code = $1`, [data.usercode]
            );
            client.release();
            return result.rowCount > 0;
        } catch (error) {
            console.error(errorConstants.ERROR_REMOVING_REFRESH_TOKEN, error);
            return false;
        }
    }
    async checkTokenStartExpiration(data) {
        try {
            const secret = process.env.JWT_SECRET_KEY;
            const decoded = jwt.verify(data.access_token, secret);
            return { valid: true, message: errorConstants.TOKEN_VALID, decoded };
        } catch (error) {
            return { valid: false, message: errorConstants.TOKEN_INVALID, error: error.message };
        }
    }
    async checkTokenEndExpiration(data) {
        try {
            const secret = process.env.JWT_SECRET_KEY;
            const decoded = jwt.verify(data.refresh_token, secret);
            return { valid: true, message: errorConstants.TOKEN_VALID, decoded };
        } catch (error) {
            return { valid: false, message: errorConstants.TOKEN_INVALID, error: error.message };
        }
    }
    async findToken(token) {
        try {
            const client = await pool.connect();
            const result = await client.query(
                `
                    SELECT * FROM TBL_BASE_REFRESH_TOKEN 
                    WHERE user_code = $1
                `, [token.usercode]
            )
            client.release();
            let access_token = ""
            let user_code = ""
            let lcCode = ""
            let code = ""
            let menu = ""
            let name = ""
            let refresh_token = ""
            if (result.rowCount >= 1) {
                result.rows.map(item => {
                    access_token = item.access_token
                    user_code = item.user_code
                    lcCode = item.lc_code
                    code = item.code
                    menu = menu
                    name = item.name,
                    refresh_token = item.refresh_token
                })
            }
            return {
                access_token: access_token,
                user_code: user_code,
                lcCode: lcCode,
                code: code,
                menu: menu,
                name: name,
                refresh_token: refresh_token
            };
        }
        catch (error) {
            return false;
        }
    }
}
module.exports = new RefreshTokenRepository