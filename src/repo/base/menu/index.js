const pool = require("../../../connect/index")
require('dotenv').config();

const errorConstants = require("../../../constants/errorConstants")
class MenuRepository {
    async foundMenu(data) {
        try {
            const client = await pool.connect();
            const result = await client.query(
                `
            SELECT
                MN.lc_code as lcCode,
                MN.name as name, MN.name_eng as nameEng,
                MN.icon as icon, MN.is_show as isShow,
                MN.img_path as imgPath, MN.route as route,
                P.name AS permission, P.menu_parent_id as menuParentId,
                P.bread_crumb_parent_id as breadCrumbParentId,
                RP.permission_id as permissionId
            FROM TBL_BASE_MENUS MN
                    LEFT JOIN TBL_BASE_PERMISSIONS P ON P.bread_crumb_parent_id = MN.code
                    LEFT JOIN TBL_BASE_ROLE_PERMISSION RP ON RP.permission_id = P.code
                    LEFT JOIN TBL_BASE_ROLES R ON R.code = RP.role_id
                    LEFT JOIN TBL_BASE_USER_ROLE UR ON UR.role_id = R.code
            WHERE
                RP.permission_id IS NOT NULL
                AND MN.lc_code = $3
                AND UR.user_id = $2
                AND R.code = $1
                `,
                [data.rolecode, data.usercode, data.lccode]
            )
            client.release();
            if (result.rows.length > 0) {
                const menu = result.rows;
                return menu
            }
            return null;
        }
        catch (error) {
            console.error(errorConstants.MENU_SEARCH_ERROR, error);
            return false;
        }
    }
}

module.exports = MenuRepository;