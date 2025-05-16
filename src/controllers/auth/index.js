const UserRepository = require("../../repo/base/auth/index")
const bcrypt = require("bcrypt")
const protocolConstants = require("../../constants/protocalConstant")
const errorConstants = require("../../constants/errorConstants");
const normalConstants = require("../../constants/normalConstants")
const UserResponseDTO = require("../../common/dto/res/userResponseDTO")
const RefreshTokenRepository = require("../../repo/base/refreshToken/index")
const MenuRepository = require("../../repo/base/menu/index")
// const UserRoleRepository = require("../../repo/base/userRole/index")
class AuthorController {

  async createOrUpdate(req, res) {
    try {
      const { name, passWord } = req.body;

      if (!name || !passWord) {
        return res.status(protocolConstants.BAD_REQUEST).json({ error: errorConstants.MISSING_REQUIRED_FIELDS });
      }

      const isExistedUser = await UserRepository.isExistedUser(req.body);
      let newUser = "";
      const hashedPassword = await bcrypt.hash(passWord, 10);
      if (!isExistedUser) {
        newUser = await UserRepository.create({ name, passWord: hashedPassword });
      } else {
        req.body.passWord = hashedPassword;
        req.body.code = isExistedUser.code
        newUser = await UserRepository.update(req.body);
      }
      return res.status(protocolConstants.SUCCESS).json(newUser);
    } catch (error) {
      console.error(errorConstants.CREATE_USER_ERROR_TITLE, error);
      return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ error: errorConstants.CREATE_USER_FAILED });
    }
  }

  async signIn(req, res) {
    try {
      const { name, passWord } = req.body;

      if (!name || !passWord) {
        return res.status(protocolConstants.BAD_REQUEST).json({ error: errorConstants.MISSING_REQUIRED_FIELDS });
      }

      const user = await UserRepository.isReturnUser(name);
      if (!user) {
        return res.status(protocolConstants.UNAUTHORIZED).json({ error: errorConstants.USER_IS_NOT_EXISTED });
      }
      const isPasswordMatch = await bcrypt.compare(passWord, user.password);

      if (!isPasswordMatch) {
        return res.status(protocolConstants.UNAUTHORIZED).json({ error: errorConstants.INVALID_CREDENTIALS });
      }

      const generateToken = await RefreshTokenRepository.generateToken(user);
      const foundMenu = await MenuRepository.foundMenu(user)

      const userResponse = new UserResponseDTO(user);
      userResponse.accessToken = generateToken
      userResponse.menu = foundMenu
      const request = {
        usercode: user.code
      }
      const findToken = await RefreshTokenRepository.findToken(request)
      if (findToken.user_code) {
        await RefreshTokenRepository.updateToken(userResponse)
      }
      else {
        await RefreshTokenRepository.saveToken(userResponse);
      }
      return res.status(protocolConstants.SUCCESS).json({ message: normalConstants.SIGN_IN_SUCCESS, user: userResponse });

    } catch (error) {
      console.error(errorConstants.SIGN_IN_ERROR_TITLE, error);
      return res.status(protocolConstants.INTERNAL_SERVER_ERROR).json({ error: errorConstants.SIGN_IN_FAILED });
    }
  }
  async signOut(req, res) {
    try {
      const { name } = req.body
      const user = await UserRepository.isReturnUser(name);

      if (!user) {
        return res.status(protocolConstants.UNAUTHORIZED).json({ error: errorConstants.USER_IS_NOT_EXISTED });
      }
      await RefreshTokenRepository.removeToken(user);
      return res.status(protocolConstants.SUCCESS).json({ user: user })
    }
    catch (error) {
      return res.status(protocolConstants.NOT_FOUND).json({ error: "not found" })
    }
  }
  async delete(req, res) {
    try {
      const user = await UserRepository.delete(req.body)
      return res.status(protocolConstants.SUCCESS).json({ user: user })
    }
    catch (error) {
      return res.status(protocolConstants.NOT_FOUND).json({ error: errorConstants.DELETE_USER_FAILED_MESSAGE })
    }
  }

  async checkAccessToken(req, res) {
    try {
      const findToken = await RefreshTokenRepository.findToken(req.body)
      const user = await RefreshTokenRepository.checkTokenStartExpiration(findToken)
      if (!user.valid) {
        const generateToken = await RefreshTokenRepository.generateToken(user);
        const userResponse = new UserResponseDTO(user)
        userResponse.refreshToken = generateToken
        userResponse.code = findToken.code
        userResponse.name = findToken.name
        userResponse.menu = findToken.menu
        userResponse.lcCode = findToken.lcCode
        userResponse.accessToken = user.access_token

        if (findToken.user_code) {
          await RefreshTokenRepository.updateToken(userResponse)
        }
        else {
          if (findToken.access_token) {
            await RefreshTokenRepository.saveToken(userResponse);
          }
        }
      }
      return res.status(protocolConstants.SUCCESS).json({ user: user })
    }
    catch (error) {
      console.error(error);
      return res.status(protocolConstants.NOT_FOUND).json({ error: errorConstants.REFRESH_TOKEN_NOT_FOUND_ERROR_TITLE })
    }
  }

  async checkRefreshToken(req, res) {
    try {
      const findToken = await RefreshTokenRepository.findToken(req.body)
      const request = {
        usercode: findToken.code
      }
      const user = await RefreshTokenRepository.checkTokenEndExpiration(findToken)
      if (!user.valid) {
        await RefreshTokenRepository.removeToken(request);
      }
      return res.status(protocolConstants.SUCCESS).json({ user: user })
    }
    catch (error) {
      console.error(error);
      return res.status(protocolConstants.NOT_FOUND).json({ error: errorConstants.REFRESH_TOKEN_NOT_FOUND_ERROR_TITLE })
    }
  }

}
module.exports = new AuthorController()