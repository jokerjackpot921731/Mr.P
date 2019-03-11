import { jsonError, errors, jsonSuccess, logger } from "../utils/system";
import { User } from "../models/schema/User";
import { hashPassword } from "../utils/encryption";
import { getID } from "../utils/commonFunctions";
import {PythonShell} from "python-shell";
import fs from "fs";

class UserService {
  static async boot () {
    let checkNumberOfUser = await User.countDocuments()
    if (checkNumberOfUser) {
      logger.verbose('Created Admin account')
    } else {
      await this.createUser({
        username: getEnv('SUPER_ADMIN_USERNAME', 'admin'),
        password: getEnv('DEFAULT_SUPER_ADMIN_PASSWORD'),
        isAdmin: true
      })
    }
  }

  static async createUser ({username, password, isAdmin, email}) {
    try {
      const checkUser = await User.findOne({ username })
      if (checkUser) return jsonError(errors.USER_IS_EXISTED)
      const checkEmail = await User.findOne({ email })
      if (checkEmail) return jsonError(errors.EMAIL_IS_EXISTED)
      const passwordHash = await hashPassword(password)
      const id = await getID(User)   
      const data = {
        ID: id,
        username: username,
        password: passwordHash.result,
        email: email,
        isAdmin: isAdmin
      }
      let user = await User.create(data)
      user = {...user._doc}
      delete user.password
      return jsonSuccess(user)
    } catch (error) {
      console.log('Create error', error)
      return jsonError(errors.SYSTEM_ERROR)
    }
  }
  static async getCSV () {
    try {
      PythonShell.run('convert_csv_to_json.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
        var contents = fs.readFileSync('./data/json/json_file.txt','utf8');
        var jsonContents = JSON.parse(contents);
        console.log(jsonContents);
      });
    } catch (error) {
      console.log('Create error', error)
      return jsonError(errors.SYSTEM_ERROR)
    }
  }
}
UserService.getCSV()
// export { UserService }