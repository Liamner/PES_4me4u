import {check, validationResult} from 'express-validator';

export const validateCreateCategory = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .custom((value, {req}) => {
            if (value == null) {
                throw new Error('Name is not specified');
            }
            return true;
        }),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(403);
            res.send({errors: error.array()})
        }
    }
];


//module.exports(validationResult);