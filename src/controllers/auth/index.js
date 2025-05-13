const UserRepository = require("../../repo/auth/index")
const bcrypt = require("bcrypt")
const protocolConstants = require("../../constants/protocalConstant")
const errorConstants = require("../../constants/errorConstants");
const normalConstants = require("../../constants/normalConstants")
const UserResponseDTO = require("../../common/dto/res/userResponseDTO")

class UserController {
  async createUser(req, res) {
    try {
      const { code, lcCode, name, passWord } = req.body;

      if (!code || !lcCode || !name || !passWord) {
        return res.status(protocolConstants.BAD_REQUEST).json({ error: errorConstants.MISSING_REQUIRED_FIELDS });
      }

      const isExistedUser = await UserRepository.isExistedUser(req.body);
      let newUser = "";
      if (!isExistedUser) {
        const hashedPassword = await bcrypt.hash(passWord, 10);
        newUser = await UserRepository.createUser({ code, lcCode, name, passWord: hashedPassword });
      } else {
        return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ error: errorConstants.USER_IS_EXISTED });
      }
      return res.status(protocolConstants.SUCCESS).json(newUser);

    } catch (error) {
      console.error(errorConstants.CREATE_USER_ERROR_TITLE, error);
      return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ error: errorConstants.CREATE_USER_FAILED });
    }
  }

  async signInUser(req, res) {
    try {
      const { name, passWord } = req.body;

      if (!name || !passWord) {
        return res.status(protocolConstants.BAD_REQUEST).json({ error: errorConstants.MISSING_REQUIRED_FIELDS });
      }

      const user = await UserRepository.isReturnUser(name);

      if (!user) {
        return res.status(protocolConstants.UNAUTHORIZED).json({ error: errorConstants.USER_IS_NOT_EXISTED });
      }

      const isPasswordMatch = await bcrypt.compare(passWord, user.pass_word);

      if (!isPasswordMatch) {
        return res.status(protocolConstants.UNAUTHORIZED).json({ error: errorConstants.INVALID_CREDENTIALS });
      }

      const userResponse = new UserResponseDTO(user);
      return res.status(protocolConstants.SUCCESS).json({ message: normalConstants.SIGN_IN_SUCCESS, user: userResponse });

    } catch (error) {
      console.error(errorConstants.SIGN_IN_ERROR_TITLE, error);
      return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ error: errorConstants.SIGN_IN_FAILED });
    }
  }

}
module.exports = new UserController()