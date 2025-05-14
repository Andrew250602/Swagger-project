class UserResponseDTO {
    constructor(data) {
        this.name = data.name
        this.code = data.code
        this.accessToken = data.accessToken
        this.lcCode = data.lcCode,
            this.menu = data.menu
    }
    accessToken;
    menu;
}
module.exports = UserResponseDTO;