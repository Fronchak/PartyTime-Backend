import { NextFunction, Request, Response, Router } from 'express';
import imageUpload from '../middlewares/file-storage';
import checkToken from '../middlewares/check-token';
import partyInputValidator from '../validators/party/party-input-validator';
import checkValidationErrors from '../middlewares/check-validation-errors';
import resolver from './controller-adapter';
import partyController from '../controllers/party-controller';
import checkIdParam from '../middlewares/check-id-param';

const partyRoutes = Router();

partyRoutes.post('/', 
    checkToken,
    imageUpload.array('photos'),
    partyInputValidator,
    checkValidationErrors,
    resolver(partyController.save));

partyRoutes.put('/:id',
    checkIdParam,
    checkToken,
    imageUpload.array('photos'),
    partyInputValidator,
    checkValidationErrors,
    resolver(partyController.updateById));

partyRoutes.get('/:id',
    checkIdParam,
    resolver(partyController.findById));

partyRoutes.get('/',
    resolver(partyController.findAllPublics));

partyRoutes.delete('/:id',
    checkIdParam,
    checkToken,
    resolver(partyController.deleteById));

export default partyRoutes;