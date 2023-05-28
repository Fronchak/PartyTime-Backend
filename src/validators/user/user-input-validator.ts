import { body } from 'express-validator';
import { cleanInput } from '../../utils/string-utils';

const userInputValidator = [
    body('name').customSanitizer(cleanInput).notEmpty().withMessage('Name is required and must be non blank'),
    body('email').customSanitizer(cleanInput).notEmpty().withMessage('Email is required and must be non blank')
        .isEmail().withMessage('Invalid email format')
];

export default userInputValidator;