import { asyncWrap } from '../utils/system'
import {AuthService} from '../services/AuthService'

class AuthController {
  static login = asyncWrap(async (req, res) => {
    const token = await AuthService.login(req.body)
    return res.json(token)
  })
}

export { AuthController }
