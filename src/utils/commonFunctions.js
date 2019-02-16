import jwt from 'jsonwebtoken'

const generateUserToken = user => {
  try {
    let abc = jwt.sign(user, getEnv('JWT_SECRET'), { expiresIn: getEnv('JWT_EXPIRE_SEC') })
    return abc
  } catch (error) {
    throw error
  }
}

const regexEscape = (exp) => {
  return String(exp).replace(/([.*+?^=!:${}()|\]\\])/g, '\\$1')
}

// Only Used when your schema has ID field. If your scheme hasn't ID field, a SYSTEM_ERROR message returned
const getID = async schema => {
  try {
    const docs = await schema.find().sort('-ID')
    return docs[0] ? docs[0].ID + 1 : 1
  } catch (error) {
    throw error
  }
}

export { generateUserToken, regexEscape, getID }