class RolePermissionEntity {
  constructor(id, code, lcCode, name, active, createdBy, updatedBy, version, createdTime, updatedTime, roleId, permissionId) {
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
    this.PERMISSION_ID = permissionId;
  }
}

module.exports = RolePermissionEntity;