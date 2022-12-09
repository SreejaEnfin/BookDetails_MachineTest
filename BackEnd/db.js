const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sreejamohan444:cluster0@cluster0.mwlsecd.mongodb.net/BookDetailsDB",
  (err) => {
    if (err) {
      console.log("Error in Connection", err);
    } else {
      console.log("DB Connection successfully established!!!");
    }
  }
);

module.exports = mongoose;
