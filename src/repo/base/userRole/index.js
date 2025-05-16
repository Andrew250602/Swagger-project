const pool = require("../../../connect/index")
const errorConstants = require("../../../constants/errorConstants")
class UserRoleRepository {
    async addRole(data) {
        try {
            const client = await pool.connect();
            const userRoleCodeValue = "USER_ROLE_003";
            const roleValue = "ROLE_002";

            const result = await client.query(
                `
            INSERT INTO TBL_BASE_USER_ROLE (CODE, LC_CODE, NAME, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, ROLE_ID, USER_ID)
            VALUES
                ($1, 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), $2, $3)
            `,
                [userRoleCodeValue, roleValue, data.code]
            );

            client.release();
            return result.rowCount;
        } catch (error) {
            console.error(errorConstants.ADD_ROLE_ERROR_TITLE, error);
            throw new Error(errorConstants.ADD_ROLE_FAILED);
        }
    }
}
module.exports = new UserRoleRepository();