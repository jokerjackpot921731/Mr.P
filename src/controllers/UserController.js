import { asyncWrap, jsonSuccess } from "../utils/system";
import { UserService } from "../services/UserService";

class UserController {
  static getInfo = asyncWrap(async (req, res) => {
    return res.json(jsonSuccess())
  })
  
  static createUser = asyncWrap(async (req, res) => {
    const data = { ...req.body }
    const createResult = await UserService.createUser(data)
    return res.json(createResult)
  })
}

export { UserController }