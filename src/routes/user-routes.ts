import { Router } from 'express';
import checkIdParam from '../middlewares/check-id-param';
import resolver from './controller-adapter';
import userController from '../controllers/user-controller';
import checkToken from '../middlewares/check-token';
import partyController from '../controllers/party-controller';

const userRoutes = Router();

userRoutes.get('/parties',
    checkToken,
    resolver(userController.findAllUserParties));

userRoutes.get('/parties/:id',
    checkIdParam,
    checkToken,
    resolver(userController.findUserParty));

userRoutes.get('/:id', 
    checkIdParam,
    resolver(userController.findById));

export default userRoutes;