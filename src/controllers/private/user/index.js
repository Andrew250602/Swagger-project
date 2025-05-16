const UserRepository = require("../../../repo/base/auth/index")
const errorConstants = require("../../../constants/errorConstants")
const normalConstants = require("../../../constants/normalConstants")

const UserResponseDTO = require("../../../common/dto/res/userResponseDTO")
class UserController {
    async getAll(req, res) {
        try {
            const users = await UserRepository.getAll();

            if (users.length > 0) {
                const convertedUsers = users.map(user => new UserResponseDTO(user));

                return res.status(200).json({
                    message: normalConstants.USERS_FETCHED_SUCCESS,
                    data: convertedUsers
                });
            } else {
                return res.status(404).json({ message: errorConstants.NO_USERS_FOUND });
            }
        } catch (error) {
            console.error(errorConstants.GET_ALL_USERS_ERROR, error);
            return res.status(500).json({ message: errorConstants.GET_ALL_USERS_FAILED });
        }
    }
    async deleteAll(req, res) {
        try {
            const isCheck = await UserRepository.deleteAll();
            if (isCheck) {
                return res.status(200).json({ message: normalConstants.USERS_DELETED_SUCCESS });
            } else {
                return res.status(404).json({ message: errorConstants.NO_USERS_FOUND });
            }
        } catch (error) {
            console.error(errorConstants.DELETE_ALL_USERS_ERROR, error);
            return res.status(500).json({ message: errorConstants.DELETE_ALL_USERS_FAILED });
        }
    }
}

module.exports = new UserController();