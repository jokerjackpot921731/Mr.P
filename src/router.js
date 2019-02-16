import express from 'express'
import { AuthController } from './controllers/AuthController';
import { Validator } from './middleware/validators';
import { UserController } from './controllers/UserController';
import { authenticated, isAdmin } from './middleware/policies';

var router = express.Router();

router.get('/info', UserController.getInfo)
router.post('/login', Validator.login, AuthController.login)
router.post('/create-user', [authenticated, isAdmin, Validator.createUSer], UserController.createUser)

export { router }