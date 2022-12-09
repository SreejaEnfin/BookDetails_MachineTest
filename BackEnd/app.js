const express = require("express");
const cors = require("cors");
const mongoose = require("./db.js");
const bookrouter = require("./routes/books.routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/books", bookrouter);

app.listen(3000, () => {
  console.log("Server listening @ PORT 3000");
});
