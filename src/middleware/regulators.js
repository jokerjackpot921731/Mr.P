import jwt from 'jsonwebtoken'
import { errors, jsonError, logger } from '../utils/system'

const requestLogger = () => {
  return (req, res, next) => {
    if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(req.method) >= 0) { 
      logger.verbose(req.url, req.body) 
    }
    next()
  }
}

const tokenParser = () => {
  return (req, res, next) => {
    let authorization = req.header('Authorization')
    if (!authorization) { return next() }

    jwt.verify(authorization.substring('Bearer '.length), getEnv('JWT_SECRET'), (err, decoded) => {
      if (err) {
        logger.error('regulators/tokenParser')
        return res.json(jsonError(errors.TOKEN_EXPIRED))
      }
      req.principal = decoded
      return next()
    })
  }
}

const uploadFileToBody = () => {
  return (req, res, next) => {
    if (req.files) {
      let keys = Object.keys(req.files)
      for (let i = 0; i < keys.length; i++) {
        req.body[keys[i]] = req.files[keys[i]]
      }
    }
    return next()
  }
}

export default [requestLogger(), tokenParser(), uploadFileToBody()]
