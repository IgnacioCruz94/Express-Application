// Modules
const express = require('express');
const router = express.Router();

// Resources
const { BooksResources } = require('../resources');

// All routes
router.use('/books', BooksResources);

module.exports = router;
