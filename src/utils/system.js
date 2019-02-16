import colors from 'colors'

const errors = {
    // -- system errors
  'SYSTEM_ERROR': { code: 'SYSTEM_ERROR' },
  'ENV_NOT_SET_ERROR': { code: 'ENV_NOT_SET_ERROR' },
  'NOT_IMPLEMENTED_ERROR': { code: 'NOT_IMPLEMENTED_ERROR' },
  'SERVER_SHUTTING_DOWN': { code: 'SERVER_SHUTTING_DOWN' },
  'SERVICE_CHECK_FAILED': { code: 'SERVICE_CHECK_FAILED' },
  'PREBOOT_ERROR': { code: 'PREBOOT_ERROR' },
  'BOOT_ERROR': { code: 'BOOT_ERROR' },
  'PREEXIT_ERROR': { code: 'PREEXIT_ERROR' },
  'EXIT_ERROR': { code: 'EXIT_ERROR' },
  'LISTEN_ERROR': { code: 'LISTEN_ERROR' },
  'SERVICE_BOOT_FAILED': { code: 'SERVICE_BOOT_FAILED' },

  // -- user-defined errors
  'ACCESS_CONDITION_FAILED': { code: 'ACCESS_CONDITION_FAILED' },
  'ACCESS_DENIED': { code: 'ACCESS_DENIED' },
  'NOT_VALID_ID': { code: 'NOT_VALID_ID' },
  'TOKEN_EXPIRED': { code: 'TOKEN_EXPIRED' },
  'TOKEN_TYPE_NOT_SUPPORTED': { code: 'TOKEN_TYPE_NOT_SUPPORTED' },
  'INVALID_TOKEN': { code: 'INVALID_TOKEN' },
  'MALFORMED_REQUEST_ERROR': { code: 'MALFORMED_REQUEST_ERROR' },
  'MISSING_REQUIRED_VALUE': { code: 'MISSING_REQUIRED_VALUE' },
  'NOT_FOUND_ERROR': { code: 'NOT_FOUND_ERROR' },
  'USER_NOT_FOUND': { code: 'USER_NOT_FOUND' },
  'AUTH_NOT_FOUND': { code: 'AUTH_NOT_FOUND' },
  'NOT_AUTHENTICATED_ERROR': { code: 'NOT_AUTHENTICATED_ERROR' },
  'OAUTH_PROVIDER_NOT_SUPPORTED': { code: 'OAUTH_PROVIDER_NOT_SUPPORTED' },
  'SIGNUP_TYPE_NOT_SUPPORTED': { code: 'SIGNUP_TYPE_NOT_SUPPORTED' },
  'INVALID_OAUTH_TOKEN': { code: 'INVALID_OAUTH_TOKEN' },
  'EMAIL_EXISTED_ERROR': { code: 'EMAIL_EXISTED_ERROR' },
  'WRONG_PASSWORD_ERROR': { code: 'WRONG_PASSWORD_ERROR' },
  'AUTH_METHOD_NOT_SUPPORTED': { code: 'AUTH_METHOD_NOT_SUPPORTED' },
  'REQUEST_OUT_OF_SCOPE': { code: 'REQUEST_OUT_OF_SCOPE' },
  'REQUEST_LIMIT_REACHED': { code: 'REQUEST_LIMIT_REACHED' },
  'TOKEN_REVOKED_ERROR': { code: 'TOKEN_REVOKED_ERROR' },
  'REDIRECT_URL_NOT_MATCHED': { code: 'REDIRECT_URL_NOT_MATCHED' },
  'INVALID_ACCESS_SCOPE': { code: 'INVALID_ACCESS_SCOPE' },
  'INVALID_GRANT_TYPE': { code: 'INVALID_GRANT_TYPE' },
  'OAUTH_APP_KEY_MISMATCHED': { code: 'OAUTH_APP_KEY_MISMATCHED' },
  'REQUEST_EXPIRED': { code: 'REQUEST_EXPIRED' },
  'DUPLICATED_ERROR': { code: 'DUPLICATED_ERROR' },
  'INVALID_AUTH_METHOD': { code: 'INVALID_AUTH_METHOD' },
  'TOKEN_GENERATED_FAILURE': { code: 'TOKEN_GENERATED_FAILURE' },
  'DONT_HAVE_PERMISSION': { code: 'DONT_HAVE_PERMISSION' },
  'INVALID_USERNAME': { code: 'INVALID_USERNAME' },
  'INVALID_PASSWORD': { code: 'INVALID_PASSWORD' },
  'USER_IS_EXISTED': { code: 'USER_IS_EXISTED' },
  'EMAIL_IS_EXISTED': { code: 'EMAIL_IS_EXISTED' },
  'CAN_NOT_CREATE_USER': { code: 'CAN_NOT_CREATE_USER' },
  'OLD_PASSWORD_NOT_MATCH': { code: 'OLD_PASSWORD_NOT_MATCH' },
  'NEW_PASSWORD_OR_CONFIRM_PASSWORD_NOT_MATCH': { code: 'NEW_PASSWORD_OR_CONFIRM_PASSWORD_NOT_MATCH' },
  'WRONG_PASSWORD': { code: 'WRONG_PASSWORD' },
  // -- position-defined errors
  'CREATE_POSITION_FAILED': { code: 'CREATE_POSITION_FAILED' },
  'POSITION_IS_EXITSTED': { code: 'POSITION_IS_EXITSTED' },
  'POSITION_NOT_FOUND': { code: 'POSITION_NOT_FOUND' },
  'POSITION_IS_ASSIGNED_FOR_USER': { code: 'POSITION_IS_ASSIGNED_FOR_USER' },
  // -- system-setting-defined errors
  'SYSTEM_SETTING_KEY_NOT_FOUND': { code: 'SYSTEM_SETTING_KEY_NOT_FOUND' },
}

const jsonSuccess = (result) => {
  return { success: true, result }
}
  
const jsonError = (err) => {
  return { success: false, error: err }
}

const logger = {
  verbose: (message) => {
    if (getEnv('FULL_LOG') !== 'true') return
    return console.log(colors['green'](`[VERB] ${JSON.stringify(message)}`))
  },
  warn: (message) => {
    if (getEnv('FULL_LOG') !== 'true') return
    return console.log(colors['yellow'](`[WARN] ${JSON.stringify(message)}`))
  },
  error: (message) => {
    return console.log(colors['red'](`[ERRO] ${JSON.stringify(message)}`))
  },
  info: (message) => {
    return console.log(colors['green'](`[INFO] ${JSON.stringify(message)}`))
  }
}

const asyncWrap = (fn) => {
  async function asyncifyWrap (req, res, next) {
    try {
      return await fn.apply(null, arguments)
    } catch (err) {
      next(err)
    }
  }
  return asyncifyWrap
}

export { errors, jsonSuccess, jsonError, logger, asyncWrap }