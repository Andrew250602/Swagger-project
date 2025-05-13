const pool = require('../../connect/index');
// const User = require("../../models/base/auth/userEntity")
const UserResponseDTO = require("../../common/dto/res/userResponseDTO")
const errorConstants = require("../../constants/errorConstants")
class UserRepository {
  async createUser(data) {
    const { code, lcCode, name, passWord } = data;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO TBL_BASE_USERS (CODE, LC_CODE, NAME, PASS_WORD, ACTIVE, CREATED_BY, UPDATED_BY, CREATED_TIME, UPDATED_TIME) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
        [code, lcCode, name, passWord, 1, 'system', 'system']
      );
      client.release();
      if (result.rows.length > 0) {
        const user = result.rows[0];
        return new UserResponseDTO(user);
      }
      return null;
    } catch (error) {
      console.error(errorConstants.CREATE_USER_DB_ERROR, error);
      throw error;
    }
  }
  async isExistedUser(data) {
    try {
      const { code, lcCode, name } = data;
      const client = await pool.connect();
      let query = 'SELECT COUNT(u.id) FROM TBL_BASE_USERS u WHERE u.code = $1';
      const values = [code];

      query += ' AND u.lc_code = $2';
      values.push(lcCode);

      if (name) {
        query += ' AND u.name = $3';
        values.push(name);
      }

      const result = await client.query(query, values);
      client.release();
      return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
      console.error('Lỗi khi kiểm tra người dùng đã tồn tại:', error);
      throw error;
    }

  }

  async isReturnUser(name) {
    try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM TBL_BASE_USERS WHERE NAME = $1',
      [name]
    );
    client.release();
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error(errorConstants.USER_NOT_FOUND_ERROR_TITLE, error);
    throw error;
  }
  }
}

module.exports = new UserRepository();