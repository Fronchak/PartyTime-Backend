import { body } from 'express-validator';
import { cleanInput } from '../../utils/string-utils';

const partyInputValidator = [
    body('title').customSanitizer(cleanInput).notEmpty().withMessage('Title is required and must be non blank'),
    body('description').customSanitizer(cleanInput).notEmpty().withMessage('Description is required and must be non blank'),
    body('privacy', 'Privacy must be specified').isBoolean().toBoolean(),
    body('partyData', 'Date must be specified').isDate().toDate()
];

export default partyInputValidator;