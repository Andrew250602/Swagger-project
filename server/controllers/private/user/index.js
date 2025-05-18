const UserRepository = require("../../../repo/base/auth/index")
const errorConstants = require("../../../constants/errorConstants")
const normalConstants = require("../../../constants/normalConstants")
const protocolConstants = require("../../../constants/protocalConstant")
const UserResponseDTO = require("../../../common/dto/res/userResponseDTO")
class UserController {
    async getAll(req, res) {
        try {
            const users = await UserRepository.getAll();

            if (users.length > 0) {

                const convertedUsers = users.map(user => new UserResponseDTO(user));

                return res.status(protocolConstants.SUCCESS).json({
                    message: normalConstants.USERS_FETCHED_SUCCESS,
                    data: convertedUsers
                });
            } else {
                return res.status(protocolConstants.NOT_FOUND).json({ message: errorConstants.NO_USERS_FOUND });
            }
        } catch (error) {
            console.error(errorConstants.GET_ALL_USERS_ERROR, error);
            return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ message: errorConstants.GET_ALL_USERS_FAILED });
        }
    }
    async deleteAll(req, res) {
        try {
            const isCheck = await UserRepository.deleteAll();
            if (isCheck) {
                return res.status(protocolConstants.SUCCESS).json({ message: normalConstants.USERS_DELETED_SUCCESS });
            } else {
                return res.status(protocolConstants.NOT_FOUND).json({ message: errorConstants.NO_USERS_FOUND });
            }
        } catch (error) {
            console.error(errorConstants.DELETE_ALL_USERS_ERROR, error);
            return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ message: errorConstants.DELETE_ALL_USERS_FAILED });
        }
    }

    async permissionUser(req, res) {
        try {
            const isPermission = await UserRepository.permissionUser(req.body);
            if (isPermission) {

                return res.status(protocolConstants.SUCCESS).json({ message: normalConstants.PERMISSION_USER_SUCCESS });
            }
            else {
                return res.status(protocolConstants.NOT_FOUND).json({ message: errorConstants.NO_USERS_FOUND });
            }
        }
        catch (error) {
            return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ message: errorConstants.PERMISSION_USER_FAILED })
        }
    }
}

module.exports = new UserController();