class MenuEntity {
  constructor(id, code, lcCode, name, nameGroup, active, createdBy, updatedBy, version, createdTime, updatedTime, route, nameEng, icon, isShow, imgPath) {
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
    this.ROUTE = route;
    this.NAME_ENG = nameEng;
    this.ICON = icon;
    this.IS_SHOW = isShow;
    this.IMG_PATH = imgPath;
  }
}

module.exports = MenuEntity;