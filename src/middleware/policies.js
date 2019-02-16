import { jsonError, errors } from "../utils/system";
import { User } from "../models/schema/User";

const authenticated = (req, res, next) => {
  console.log(req.principal)
  if (!req.principal) return res.json(jsonError(errors.NOT_AUTHENTICATED_ERROR))
  return next()
}

const isAdmin = async (req, res, next) => {
  try {
    let id = req.principal.id
    let user = await User.findById(id)
    if (!user) return res.json(jsonError(errors.USER_NOT_FOUND))
    if (!user.isAdmin) return res.json(jsonError(errors.DONT_HAVE_PERMISSION))
    return next()
  } catch (error) {
    throw error
  }
}

export { authenticated, isAdmin }