const pool = require('./index');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('Bắt đầu thêm hoặc cập nhật dữ liệu mẫu (có hash mật khẩu)...');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const normalPassword = await bcrypt.hash('user456', 10);

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_MENUS
    await client.query(`
      INSERT INTO TBL_BASE_MENUS (ID, CODE, LC_CODE, NAME, NAME_GROUP, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, ROUTE, NAME_ENG, ICON, IS_SHOW, IMG_PATH)
      VALUES
          (1, 'MENU_001', 'en', 'Trang chủ', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), '/home', 'Home', 'home-icon.png', TRUE, '/images/home.png'),
          (2, 'MENU_002', 'en', 'Dữ liệu chính', NULL, 1, 'admin', 'admin', 2, NOW(), NOW(), '/master_data', 'Master Data', 'database-icon.png', TRUE, '/images/master_data.png'),
          (3, 'MENU_003', 'en', 'Sản phẩm', 2, 1, 'admin', 'admin', 1, NOW(), NOW(), '/production', 'Product', 'product-icon.png', TRUE, '/images/product.png'),
          (4, 'MENU_004', 'en', 'Đơn vị', 2, 1, 'admin', 'admin', 1, NOW(), NOW(), '/unit', 'Unit', 'unit-icon.png', TRUE, '/images/unit.png')
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        NAME_GROUP = EXCLUDED.NAME_GROUP,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        ROUTE = EXCLUDED.ROUTE,
        NAME_ENG = EXCLUDED.NAME_ENG,
        ICON = EXCLUDED.ICON,
        IS_SHOW = EXCLUDED.IS_SHOW,
        IMG_PATH = EXCLUDED.IMG_PATH;
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_MENUS đã được thêm hoặc cập nhật.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_ROLES
    await client.query(`
      INSERT INTO TBL_BASE_ROLES (ID, CODE, LC_CODE, NAME, NAME_GROUP, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME)
      VALUES
          (1, 'ROLE_001', 'en', 'Administrator', NULL, 1, 'admin', 'admin', 1, NOW(), NOW()),
          (2, 'ROLE_002', 'en', 'User', NULL, 1, 'user', 'user', 1, NOW(), NOW())
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        NAME_GROUP = EXCLUDED.NAME_GROUP,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW();
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_ROLES đã được thêm hoặc cập nhật.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_USERS (có hash mật khẩu)
    await client.query(`
      INSERT INTO TBL_BASE_USERS (ID, CODE, LC_CODE, NAME, NAME_GROUP, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, PASS_WORD)
      VALUES
          (1, 'USER_001', 'en', 'Admin User', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), $1),
          (2, 'USER_002', 'en', 'Normal User', NULL, 1, 'user', 'user', 1, NOW(), NOW(), $2)
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        NAME_GROUP = EXCLUDED.NAME_GROUP,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        PASS_WORD = EXCLUDED.PASS_WORD;
    `, [adminPassword, normalPassword]);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_USERS đã được thêm.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_USER_ROLE
    await client.query(`
      INSERT INTO TBL_BASE_USER_ROLE (ID, CODE, LC_CODE, NAME, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, ROLE_ID, USER_ID)
      VALUES
          (1, 'USER_ROLE_001', 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), 'ROLE_001', 'USER_001'),
          (2, 'USER_ROLE_002', 'en', '', 1, 'user', 'user', 1, NOW(), NOW(), 'ROLE_002', 'USER_002')
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        ROLE_ID = EXCLUDED.ROLE_ID,
        USER_ID = EXCLUDED.USER_ID;
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_USER_ROLE đã được thêm hoặc cập nhật.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_PERMISSIONS
    await client.query(`
      INSERT INTO TBL_BASE_PERMISSIONS (ID, CODE, LC_CODE, NAME, NAME_GROUP, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, MENU_PARENT_ID, BREAD_CRUMB_PARENT_ID)
      VALUES
          (1, 'PERMISSION_001', 'en', 'view_home', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), 1, 'MENU_001'),
          (2, 'PERMISSION_002', 'en', 'view_master_data', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), 2, 'MENU_002'),
          (3, 'PERMISSION_003', 'en', 'product_management', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), 3, 'MENU_003'),
          (4, 'PERMISSION_004', 'en', 'unit_management', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), 4, 'MENU_004')
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        NAME_GROUP = EXCLUDED.NAME_GROUP,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        MENU_PARENT_ID = EXCLUDED.MENU_PARENT_ID,
        BREAD_CRUMB_PARENT_ID = EXCLUDED.BREAD_CRUMB_PARENT_ID;
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_PERMISSIONS đã được thêm hoặc cập nhật.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_ROLE_PERMISSION
    await client.query(`
      INSERT INTO TBL_BASE_ROLE_PERMISSION (ID, CODE, LC_CODE, NAME, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, PERMISSION_ID, ROLE_ID)
      VALUES
          (1, 'PERMISSION_ROLE_001', 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), 'PERMISSION_001', 'ROLE_001'),
          (2, 'PERMISSION_ROLE_002', 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), 'PERMISSION_002', 'ROLE_001'),
          (3, 'PERMISSION_ROLE_003', 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), 'PERMISSION_003', 'ROLE_001'),
          (4, 'PERMISSION_ROLE_004', 'en', '', 1, 'admin', 'admin', 1, NOW(), NOW(), 'PERMISSION_004', 'ROLE_001'),
          (5, 'PERMISSION_ROLE_005', 'en', '', 1, 'user', 'user', 1, NOW(), NOW(), 'PERMISSION_001', 'ROLE_002'),
          (6, 'PERMISSION_ROLE_006', 'en', '', 1, 'user', 'user', 1, NOW(), NOW(), 'PERMISSION_002', 'ROLE_002')
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        PERMISSION_ID = EXCLUDED.PERMISSION_ID,
        ROLE_ID = EXCLUDED.ROLE_ID;
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_ROLE_PERMISSION đã được thêm hoặc cập nhật.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_REFRESH_TOKEN
    await client.query(`
      INSERT INTO TBL_BASE_REFRESH_TOKEN (ID, CODE, LC_CODE, NAME, NAME_GROUP, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRATION, USER_CODE)
      VALUES
          (1, 'REFRESH_001', 'en', 'Admin Token', NULL, 1, 'admin', 'admin', 1, NOW(), NOW(), 'access_token_admin', 'refresh_token_admin', NOW() + INTERVAL '1 day', 'USER_001'),
          (2, 'REFRESH_002', 'en', 'User Token', NULL, 1, 'user', 'user', 1, NOW(), NOW(), 'access_token_user', 'refresh_token_user', NOW() + INTERVAL '1 day', 'USER_002')
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        NAME_GROUP = EXCLUDED.NAME_GROUP,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        ACCESS_TOKEN = EXCLUDED.ACCESS_TOKEN,
        REFRESH_TOKEN = EXCLUDED.REFRESH_TOKEN,
        EXPIRATION = EXCLUDED.EXPIRATION,
        USER_CODE = EXCLUDED.USER_CODE;
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_REFRESH_TOKEN đã được thêm hoặc cập nhật.');

    // Thêm hoặc cập nhật dữ liệu vào bảng TBL_BASE_USER_LOG
    await client.query(`
      INSERT INTO TBL_BASE_USER_LOG (ID, CODE, LC_CODE, NAME, NAME_GROUP, ACTIVE, CREATED_BY, UPDATED_BY, VERSION, CREATED_TIME, UPDATED_TIME, ROLE_ID)
      VALUES
          (1, 'USER_LOG_001', 'en', 'Admin Login', NULL, 1, 'system', 'system', 1, NOW(), NOW(), 'ROLE_001'),
          (2, 'USER_LOG_002', 'en', 'User Accessed Product', NULL, 1, 'USER_002', 'USER_002', 1, NOW(), NOW(), 'ROLE_002')
      ON CONFLICT (ID, CODE, LC_CODE) DO UPDATE SET
        NAME = EXCLUDED.NAME,
        NAME_GROUP = EXCLUDED.NAME_GROUP,
        ACTIVE = EXCLUDED.ACTIVE,
        UPDATED_BY = EXCLUDED.UPDATED_BY,
        VERSION = EXCLUDED.VERSION + 1,
        UPDATED_TIME = NOW(),
        ROLE_ID = EXCLUDED.ROLE_ID;
    `);
    console.log('Dữ liệu mẫu cho bảng TBL_BASE_USER_LOG đã được thêm hoặc cập nhật.');

    console.log('Hoàn tất việc thêm hoặc cập nhật dữ liệu mẫu.');
    return true;
  } catch (error) {
    console.error('Lỗi khi thêm hoặc cập nhật dữ liệu mẫu:', error);
    return false;
  } finally {
    client.release();
  }
}

module.exports = seedDatabase;