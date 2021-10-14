const {check, validationResult} = require('express-validator');

const validateCreateProduct = [
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
    check('categories')
        .exists()
        .not()
        .isEmpty(),
    check('exchange')
        .exists()
        .not()
        .isEmpty(),
    check('state')
        .exists()
        .not()
        .isEmpty(),
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


module.exports = {validateCreateProduct};