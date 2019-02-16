import { errors, jsonError, jsonSuccess } from '../utils/system'
import { comparePassword }  from '../utils/encryption'
import { generateUserToken } from '../utils/commonFunctions'
import {User} from '../models/schema/User'

class AuthService {
  static async login ({ username, password }) {
    try {
      const user = await User.findOne({ username }).select('password')
      if (!user) return jsonError(errors.USER_NOT_FOUND)
      const dbPassword = user.password
      const resultComparePass = await comparePassword(password, dbPassword)
      if (!resultComparePass.result) return jsonError(errors.WRONG_PASSWORD)
      const tokenData = {
        id: user._id
      }
      const token = await generateUserToken(tokenData)
      if (!token) return jsonError(errors.TOKEN_GENERATED_FAILURE)
      return jsonSuccess({ token: token })
    } catch (error) {
      console.log('Login failed with', error)
      return jsonError(errors.SYSTEM_ERROR)
    }
  }
}

export { AuthService }
