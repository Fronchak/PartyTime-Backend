import { Router } from 'express';
import resolver from './controller-adapter';
import authController from '../controllers/auth-controller';
import userInputValidator from '../validators/user/user-input-validator';
import userInsertValidator from '../validators/user/user-insert-validator';
import checkValidationErrors from '../middlewares/check-validation-errors';
import checkToken from '../middlewares/check-token';
import userUpdateValidator from '../validators/user/user-update-validator';

const authRoutes = Router();

authRoutes.post('/register', 
    userInputValidator,
    userInsertValidator,
    checkValidationErrors,
    resolver(authController.register));

authRoutes.put('/', 
    checkToken,
    userInputValidator,
    userUpdateValidator,
    checkValidationErrors,
    resolver(authController.update));

authRoutes.post('/login', resolver(authController.login));

export default authRoutes;