class RoleEntity {
  constructor(id, code, lcCode, name, nameGroup, active, createdBy, updatedBy, version, createdTime, updatedTime) {
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
  }
}

module.exports = RoleEntity;