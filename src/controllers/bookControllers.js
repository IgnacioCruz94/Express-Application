// Models
const { Book } = require('../models');

// Fecth all books
const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

// Get book by guid
const getByGuid = (req, res) => {
  const { guid } = req.params;
  // Read all books
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: 'Book not found.',
      });
    }
  });
};

// Add new book to books
const createUser = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);
  // Save in db
  newBook.save();
  res.send({
    message: 'Book information successfully stored!!!',
    guid: newBook.getGuid(),
  });
};

// Update an existing book information
const updateUser = (req, res) => {
  const { params: { guid }, body } = req;
  // Read all books
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      Object.assign(book, body);
      Book.update(books);
      res.send({
        message: 'Book information successfully updated!!!',
      });
    } else {
      res.status(404).send({
        message: 'Book not found.',
      });
    }
  });
};

// Delete book from books
const deleteUser = (req, res) => {
  const { guid } = req.params;
  // Read all books
  Book.getAll((books) => {
    // Filter by guid
    const bookIdx = books.findIndex(ent => ent.guid === guid);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      res.send({
        message: 'Book information successfully deleted!!!',
      });
    } else {
      res.status(404).send({
        message: 'Book not found.',
      });
    }
  });
};

module.exports = {
  getAll,
  getByGuid,
  createUser,
  updateUser,
  deleteUser,
};
