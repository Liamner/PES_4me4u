const {check, validationResult} = require('express-validator');

exports.validateCreateProduct = [
    check('name')
        .exists()
        .not()
        .isEmpty(),
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