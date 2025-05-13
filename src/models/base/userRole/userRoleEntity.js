class UserRoleEntity {
  constructor(id, code, lcCode, name, active, createdBy, updatedBy, version, createdTime, updatedTime, roleId, userId) {
    this.ID = id;
    this.CODE = code;
    this.LC_CODE = lcCode;
    this.NAME = name;
    this.ACTIVE = active;
    this.CREATED_BY = createdBy;
    this.UPDATED_BY = updatedBy;
    this.VERSION = version;
    this.CREATED_TIME = createdTime;
    this.UPDATED_TIME = updatedTime;
    this.ROLE_ID = roleId;
    this.USER_ID = userId;
  }
}

module.exports = UserRoleEntity;