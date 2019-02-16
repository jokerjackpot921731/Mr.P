import { errors, logger, jsonError, jsonSuccess } from "../utils/system";
import mongoose from 'mongoose'
import { schemas } from "./framwork";

const preBoot = async () => {
  logger.verbose('Connecting to mongodb...')
  let mongoResult = await new Promise(resolve => {
    mongoose.connect(`mongodb://${getEnv('MONGO_HOST')}:${getEnv('MONGO_PORT')}/${getEnv('MONGO_DB')}`, { useNewUrlParser: true })
      .then((mongo) => {
        return resolve(jsonSuccess(mongo))
      })
      .catch(err => {
        logger.error('Failed to connect to mongodb', err)
        return resolve(jsonError(errors.SYSTEM_ERROR))
      })
  })
  if (!mongoResult.success) { return mongoResult }
  logger.verbose('Connected to mongodb')

  // -- load models
  const sequelizeModels = {}
  logger.verbose('Loading models...')
  let keys = Object.keys(schemas)
  for (let i = 0; i < keys.length; i++) {
    logger.verbose(`Loading schema ${keys[i]}...`)
    // -- in reality we either use mongo or sequelize, not both, do we don't check
    // the function name
    let schema = schemas[keys[i]]
    if (!schema) {
      logger.error(`Cannot load ${keys[i]}, please make sure you include the schema in framework`)
      return jsonError(errors.SYSTEM_ERROR)
    }

    let model
    switch (schema.name) {
      case 'm':
        model = schema(mongoResult.result, mongoose)
        break
      case 's':
        // model = schema(mysqlResult.result, Sequelize)
        sequelizeModels[model.name] = model
        break
    }
  }

  keys = Object.keys(sequelizeModels)
  for (let i = 0; i < keys.length; i++) {
    logger.verbose(`Associating model ${keys[i]}...`)
    sequelizeModels[keys[i]].associate(sequelizeModels)
  }

  return jsonSuccess()
}

const boot = async () => {
  // -- this boot runs after all services had successfully booted
  return jsonSuccess()
}
const preExit = async () => {
  // -- this exit runs before any services' exit
  return jsonSuccess()
}
const exit = async () => {
  // -- this exit runs after all services had exited
  return jsonSuccess()
}

export { preBoot, preExit, boot, exit }
