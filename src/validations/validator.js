const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403);
        res.send({ errors: error.array() });       
    }
};

const validateInput = [
    body('title')
        .exists()
        .withMessage("Book title has been omitted.")
        .isString()
        .withMessage("Book title has to be a string.")
        .notEmpty()
        .withMessage("Book title can not be empty!.")
        .bail(),
        body('author')
            .exists()
            .withMessage("Book author has been omitted.")
            .isString()
            .withMessage("Book author has to be a string.")
            .notEmpty()
            .withMessage("Book author can not be empty!.")
            .bail(),
    body('publication_year')
        .exists()
        .withMessage("Book publication year has been omitted.")
        .isNumeric()
        .withMessage("Book publication year has to be a numeric value.")
        .custom((value, { req }) => {
            const today = new Date();
            const currentYear = today.getFullYear();
            if (value < 1454 || value > currentYear) {
                throw new Error('Publication year have to be larger than 1454 and less or equal than the current year')
            }
            return true
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const duplicateBooks = [
    body('title')
        .custom((value, { req }) => {

        })
];

module.exports = { validateInput };