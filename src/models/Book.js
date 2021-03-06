// Modules
const { response } = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to users.json
const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class Books {
  constructor(data) {
    const { title, author, publication_year } = data;
    this.guid = uuid.v4();
    this.title = title;
    this.author = author;
    this.publication_year = publication_year;
  }

  getGuid() {
    return this.guid;
  }

  // We push a new book to books array and save
  save() {
    // We read the file everytime we need to modify it
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      books.push(this);
      
      // Write the file
      fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
    })
  }

  // We update data with the given one
  static update(books) {
    fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
  }

  // get and parse the data (async)
  static getAll(cb) {
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      // callback function when the data is ready
      cb(books);
    });
  }
};
