import { m as userSchema } from '../models/schema/User'
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';

const environments = ['LCL', 'PRO', 'STG', 'DEV']
const controllers = { UserController }
const schemas = { userSchema }
const services = { UserService }

export { environments, schemas, controllers, services }