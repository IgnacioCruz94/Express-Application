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
        .if((value, { req }) => {
            Book.getAll((books) => {
                const book = books.find(ent => ent.title === value);
                if (book) { }
                return true
            });                         
        }),
    body('author')
        .if((value, { req }) => {
            Book.getAll((books) => {
                const book = books.find(ent => ent.author === value);
                if (book) { }
                return true
            });                         
        }),
    body('publication_year')
        .if((value, { req }) => {
            Book.getAll((books) => {
                const book = books.find(ent => ent.publication_year === value);
                if (book) { }
                return true
            });                         
        }),
    (req, res) => {
        res.send("This book information already exist!.")
    },
];

module.exports = { validateInput, duplicateBooks };
