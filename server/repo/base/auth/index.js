const pool = require('../../../connect/index');
// const User = require("../../models/base/auth/userEntity")
const UserResponseDTO = require("../../../common/dto/res/userResponseDTO")
const errorConstants = require("../../../constants/errorConstants")
const normalConstants = require("../../../constants/normalConstants")
const generateCode = require("../../../until/index")
class UserRepository {
  async create(data) {
    const { name, passWord } = data;
    try {
      const client = await pool.connect();
      const count = await client.query(`
        SELECT COUNT(ID) FROM TBL_BASE_USERS`)
      let baseCode = "code";
      let increment = 0;
      if (count.rowCount < 100) {
        increment = count.rowCount + 1
      }
      let codeValue = generateCode(baseCode, increment);
      let lcCodeValue = "lc_Code"
      const result = await client.query(
        `INSERT INTO TBL_BASE_USERS (CODE, LC_CODE, NAME, PASS_WORD, ACTIVE, CREATED_BY, UPDATED_BY, CREATED_TIME, UPDATED_TIME) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
        [codeValue, lcCodeValue, name, passWord, 1, 'system', 'system']
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
  async update(data) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
        UPDATE TBL_BASE_USERS
        SET code = $1,
            name = $2,
            pass_word = $3
        WHERE code = $1
        `,
        [data.code, data.name, data.passWord]
      );
      client.release();
      if (result.rows.length > 0) {
        const user = result.rows;
        return new UserResponseDTO(user);
      }
      return normalConstants.UPDATE_SUCCESS;
    } catch (error) {
      console.error(errorConstants.CREATE_USER_DB_ERROR, error);
      throw error;
    }
  }
  async isExistedUser(data) {
    try {
      const { name } = data;
      const client = await pool.connect();
      let query = `SELECT COUNT(u.id) 
      FROM TBL_BASE_USERS u WHERE`;
      if (name) {
        query += ' u.name = $1';
      }
      const values = [name];

      const result = await client.query(query, values);
      client.release();
      return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
      console.error(errorConstants.USER_CHECK_ERROR, error);
      throw error;
    }

  }

  async isReturnUser(name) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `SELECT 
          U.name as name, 
          U.code as code, 
          R.name as roleName, 
          R.code as roleCode, 
          U.lc_code as lcCode, 
          U.code as userCode,
          U.pass_word as passWord
        FROM TBL_BASE_USERS U
        JOIN TBL_BASE_USER_ROLE UR ON U.code = UR.user_id
        JOIN TBL_BASE_ROLES R ON R.code = UR.role_id
        WHERE U.name = $1 
        AND U.active <> 0
        `,
        [name]
      );
      client.release();
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null
    } catch (error) {
      console.error(errorConstants.USER_NOT_FOUND_ERROR_TITLE, error);
      throw error;
    }
  }
  async delete(data) {
    try {
      const client = await pool.connect();
      const result = await client.query(`
      DELETE FROM TBL_BASE_USERS
      WHERE code = $1
    `, [data.code]);
      client.release();
      return result.rowCount;
    } catch (error) {
      console.error(errorConstants.USER_NOT_FOUND_ERROR_TITLE, error);
      throw error;
    }
  }
  async deleteAll() {

    try {
      const client = await pool.connect()
      await client.query(`
            DROP TABLE IF EXISTS TBL_BASE_USERS
            `)
      client.release();
      return true
    } catch (error) {
      console.error(errorConstants.USER_NOT_FOUND_ERROR_TITLE, error);
      throw error;
    }
  }

  async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query(`
        SELECT * FROM TBL_BASE_USERS
        `);
      client.release();
      return result.rows;
    } catch (error) {
      console.error(errorConstants.USER_NOT_FOUND_ERROR_TITLE, error);
      throw error
    }
  }
  async permissionUser(data) {
    try {
      const client = await pool.connect();
      await client.query(`
      INSERT INTO TBL_BASE_USER_ROLE (ID, CODE, LC_CODE, NAME, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, ROLE_ID, USER_ID)
      VALUES (1, 'USER_ROLE_001', 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), $1, $2)
        `, [data.roleId, data.userId]);
      client.release();
      return true
    }
    catch (error) {
      console.error(errorConstants.USER_NOT_FOUND_ERROR_TITLE, error);
      return false
    }
  }
}

module.exports = new UserRepository();