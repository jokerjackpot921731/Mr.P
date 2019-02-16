'use strict'

import Joi from 'joi'
import { jsonError } from '../utils/system'

class Validator {
  static login (req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().min(6).required()
    })
    const result = Joi.validate({ username: req.body.username, password: req.body.password }, schema)
    if (result.error) {
      return res.json(jsonError(result.error.message))
    }
    return next()
  }

  static createUSer (req, res, next) {
    const data = { ...req.body }
    const schema = Joi.object().keys({
      username: Joi.strict().required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().required(),
      isAdmin: Joi.boolean().required()
    })
    const result = Joi.validate(data, schema)
    if (result.error) return res.json(jsonError(result.error.message))
    return next()
  }
}

export { Validator }
