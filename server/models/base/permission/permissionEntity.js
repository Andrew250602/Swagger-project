class PermissionEntity {
  constructor(id, code, lcCode, name, nameGroup, active, createdBy, updatedBy, version, createdTime, updatedTime, menuParentId, breadCrumbParentId) {
    this.ID = id;
    this.CODE = code;
    this.LC_CODE = lcCode;
    this.NAME = name;
    this.NAME_GROUP = nameGroup;
    this.ACTIVE = active;
    this.CREATED_BY = createdBy;
    this.UPDATED_BY = updatedBy;
    this.VERSION = version;
    this.CREATED_TIME = createdTime;
    this.UPDATED_TIME = updatedTime;
    this.MENU_PARENT_ID = menuParentId;
    this.BREAD_CRUMB_PARENT_ID = breadCrumbParentId;
  }
}

module.exports = PermissionEntity;