const pool = require('./index'); // Đảm bảo đường dẫn đến file cấu hình pool của bạn là chính xác

async function createTables() {
  const client = await pool.connect();
  try {
    console.log('Bắt đầu kiểm tra và tạo các bảng...');

    // Tạo bảng TBL_BASE_USERS
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_USERS (
          ID                      BIGSERIAL           NOT NULL,
          CODE                    VARCHAR(255)        NOT NULL,
          LC_CODE                 VARCHAR(255)        NOT NULL,
          NAME                    VARCHAR(255)        NOT NULL,
          NAME_GROUP              BIGINT                      ,
          ACTIVE                  SMALLINT            NOT NULL,
          CREATED_BY              VARCHAR(255)                ,
          UPDATED_BY              VARCHAR(255)                ,
          VERSION                 BIGINT                      ,
          CREATED_TIME            TIMESTAMP(6)                ,
          UPDATED_TIME            TIMESTAMP(6)                ,
          PASS_WORD               VARCHAR(255)        NOT NULL,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_USERS đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_MENUS
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_MENUS (
          ID                      BIGSERIAL           NOT NULL,
          CODE                    VARCHAR(255)        NOT NULL,
          LC_CODE                 VARCHAR(255)        NOT NULL,
          NAME                    VARCHAR(255)        NOT NULL,
          NAME_GROUP              BIGINT                      ,
          ACTIVE                  SMALLINT            NOT NULL,
          CREATED_BY              VARCHAR(255)                ,
          UPDATED_BY              VARCHAR(255)                ,
          VERSION                 BIGINT                      ,
          CREATED_TIME            TIMESTAMP(6)                ,
          UPDATED_TIME            TIMESTAMP(6)                ,
          ROUTE                   VARCHAR(255)                ,
          NAME_ENG                VARCHAR(255)                ,
          ICON                    VARCHAR(255)                ,
          IS_SHOW                 BOOLEAN                     ,
          IMG_PATH                VARCHAR(255)                ,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_MENUS đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_ROLES
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_ROLES (
          ID                  BIGSERIAL           NOT NULL,
          CODE                VARCHAR(255)        NOT NULL,
          LC_CODE             VARCHAR(255)        NOT NULL,
          NAME                VARCHAR(255)        NOT NULL,
          NAME_GROUP          BIGINT                      ,
          ACTIVE              SMALLINT            NOT NULL,
          CREATED_BY          VARCHAR(255)                ,
          UPDATED_BY          VARCHAR(255)                ,
          VERSION             BIGINT                      ,
          CREATED_TIME        TIMESTAMP(6)                ,
          UPDATED_TIME        TIMESTAMP(6)                ,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_ROLES đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_REFRESH_TOKEN
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_REFRESH_TOKEN (
          ID                  BIGSERIAL           NOT NULL,
          CODE                VARCHAR(255)        NOT NULL,
          LC_CODE             VARCHAR(255)        NOT NULL,
          NAME                VARCHAR(255)        NOT NULL,
          NAME_GROUP          BIGINT                      ,
          ACTIVE              SMALLINT            NOT NULL,
          CREATED_BY          VARCHAR(255)                ,
          UPDATED_BY          VARCHAR(255)                ,
          VERSION             BIGINT                      ,
          CREATED_TIME        TIMESTAMP(6)                ,
          UPDATED_TIME        TIMESTAMP(6)                ,
          ACCESS_TOKEN        VARCHAR(255)                ,
          REFRESH_TOKEN       VARCHAR(255)                ,
          EXPIRATION          TIMESTAMP(6)                ,
          USER_CODE           VARCHAR(255)                ,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_REFRESH_TOKEN đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_PERMISSIONS
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_PERMISSIONS (
          ID                      BIGSERIAL           NOT NULL,
          CODE                    VARCHAR(255)        NOT NULL,
          LC_CODE                 VARCHAR(255)        NOT NULL,
          NAME                    VARCHAR(255)        NOT NULL,
          NAME_GROUP              BIGINT                      ,
          ACTIVE                  SMALLINT            NOT NULL,
          CREATED_BY              VARCHAR(255)                ,
          UPDATED_BY              VARCHAR(255)                ,
          VERSION                 BIGINT                      ,
          CREATED_TIME            TIMESTAMP(6)                ,
          UPDATED_TIME            TIMESTAMP(6)                ,
          MENU_PARENT_ID          BIGINT                      ,
          BREAD_CRUMB_PARENT_ID   VARCHAR(255)                ,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_PERMISSIONS đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_ROLE_PERMISSION
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_ROLE_PERMISSION (
          ID                      BIGSERIAL           NOT NULL,
          CODE                    VARCHAR(255)        NOT NULL,
          LC_CODE                 VARCHAR(255)        NOT NULL,
          NAME                    VARCHAR(255)        NOT NULL,
          ACTIVE                  SMALLINT            NOT NULL,
          CREATED_BY              VARCHAR(255)                ,
          UPDATED_BY              VARCHAR(255)                ,
          VERSION                 BIGINT                      ,
          CREATED_TIME            TIMESTAMP(6)                ,
          UPDATED_TIME            TIMESTAMP(6)                ,
          ROLE_ID                 VARCHAR(255)        NOT NULL,
          PERMISSION_ID           VARCHAR(255)        NOT NULL,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_ROLE_PERMISSION đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_USER_ROLE
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_USER_ROLE (
          ID                  BIGSERIAL           NOT NULL,
          CODE                VARCHAR(255)        NOT NULL,
          LC_CODE             VARCHAR(255)        NOT NULL,
          NAME                VARCHAR(255)        NOT NULL,
          ACTIVE              SMALLINT            NOT NULL,
          CREATED_BY          VARCHAR(255)                ,
          UPDATED_BY          VARCHAR(255)                ,
          VERSION             BIGINT                      ,
          CREATED_TIME        TIMESTAMP(6)                ,
          UPDATED_TIME        TIMESTAMP(6)                ,
          ROLE_ID             VARCHAR(255)        NOT NULL,
          USER_ID             VARCHAR(255)        NOT NULL,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_USER_ROLE đã được kiểm tra và đã được tạo.');

    // Tạo bảng TBL_BASE_USER_LOG
    await client.query(`
      CREATE TABLE IF NOT EXISTS TBL_BASE_USER_LOG (
          ID                      BIGSERIAL           NOT NULL,
          CODE                    VARCHAR(255)        NOT NULL,
          LC_CODE                 VARCHAR(255)        NOT NULL,
          NAME                    VARCHAR(255)        NOT NULL,
          NAME_GROUP              BIGINT                      ,
          ACTIVE                  SMALLINT            NOT NULL,
          CREATED_BY              VARCHAR(255)                ,
          UPDATED_BY              VARCHAR(255)                ,
          VERSION                 BIGINT                      ,
          CREATED_TIME            TIMESTAMP(6)                ,
          UPDATED_TIME            TIMESTAMP(6)                ,
          ROLE_ID                 VARCHAR(255)                ,
          PRIMARY KEY (ID, CODE, LC_CODE)
      );
    `);
    console.log('Bảng TBL_BASE_USER_LOG đã được kiểm tra và đã được tạo.');

    console.log('Hoàn tất kiểm tra và tạo các bảng.');
    return true;
  } catch (error) {
    console.error('Lỗi khi kiểm tra hoặc tạo bảng:', error);
    return false;
  } finally {
    client.release();
  }
}

module.exports = createTables;