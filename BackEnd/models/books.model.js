const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  bookId: {
    type: String,
  },
  bookName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  bookPrice: {
    type: Number,
  },
  bookStatus: {
    type: Boolean,
  },
});

const BookModel = new mongoose.model('book', BookSchema);
module.exports = BookModel;
