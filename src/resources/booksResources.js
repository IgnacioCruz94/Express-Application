// Modules
const express = require('express');
const BooksResources = express.Router();
const { validateInput } = require("../validations/validator");

// Controllers
const { BookControllers } = require('../controllers');

// All user resources
BooksResources.get('/', BookControllers.getAll);
BooksResources.post('/', duplicateBooks, validateInput, BookControllers.createUser);
BooksResources.get('/:guid', BookControllers.getByGuid);
BooksResources.put('/:guid', BookControllers.updateUser);
BooksResources.delete('/:guid', BookControllers.deleteUser);

module.exports = BooksResources;
