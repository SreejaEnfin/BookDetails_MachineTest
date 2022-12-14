const express = require("express");
const cors = require("cors");
const bookrouter = express.Router();
const Book = require("../models/books.model.js");
const objectId = require("mongoose").Types.ObjectId;
const yup = require('yup');

const app = express();

app.use(express.json());
app.use(cors());


// validation using yup

const BookSchema = yup.object().shape({
  bookId:yup.number("Number is required").required(),
  bookName:yup.string().required(),
  authorName:yup.string().required(),
  publishedYear:yup.number().required(),
  bookPrice:yup.number().required(),
  bookStatus:yup.boolean().required()
});

// post

bookrouter.post('/', async(req, res, next)=>{
  try{
    const parsedData = await BookSchema.validate(req.body);
    const book = new Book({
      bookId: parsedData.bookId,
      bookName: parsedData.bookName,
      authorName: parsedData.authorName,
      publishedYear: parsedData.publishedYear,
      bookPrice: parsedData.bookPrice,
      bookStatus: parsedData.bookStatus,
    });
    const ret = await book.save();
    return res.status(200).json({
      message:"Data Added",
      data: ret
    })
    }
    catch(e){
      res.json({
        "success":false,
        "message":"Failed",
        "data":e
      })
    }
})




// updating a book
bookrouter.put("/:id", async(req, res) => {
  try{  
    const parsedData = await BookSchema.validate(req.body);
    let book = {
      bookId: parsedData.bookId,
      bookName: parsedData.bookName,
      authorName: parsedData.authorName,
      publishedYear: parsedData.publishedYear,
      bookPrice: parsedData.bookPrice,
      bookStatus: parsedData.bookStatus,
    };
    const result = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: book },
      { new: true });
    res.status(200).json({
      message:'Data updated',
      data:result
    });
  } catch(e){
    res.send({
      success:false,
      message:"Failed",
      data:e
  });
}
});


// pagination for db

bookrouter.get('/', async(req, res)=>{
  const page = parseInt(req.query.page);
    const limit = req.query.limit;
  
    const startIndex = (page-1)*limit;
  
    const results = {}
    var pageDown = [];
  try{
    results.finalData = await Book.find().limit(limit).skip(startIndex).exec();
    results.count = await Book.countDocuments();
    results.pageCount = Math.ceil(results.count/limit);
    for(i=1;i<=results.pageCount;i++){
      pageDown.push(i);
    }
    res.status(200).send({
      message:"Details updated",
      data:results,
      pages:pageDown
    });
  }catch(e){
    res.status(500).json(
      {
        "success":false,
        "data":e

      })
    
  } 
  
})

// getting book by id
bookrouter.get("/:id", async(req, res) => {
  try{
      const book = await Book.findById(req.params.id);
      res.status(200).json({
        "success":true,
        "data":book
      });
  }catch(err){
    return res.status(400).json({
      "success":false,
      "data": err
  })
}
});
  

// delete
bookrouter.delete("/:id", async(req, res) => {
  try{
      const book = await Book.findByIdAndRemove(req.params.id);
      res.status(200).json({
        "success":true,
        "data":book
      });
  }catch(err){
    res.status(400).json({
      "success":false,
      "data":err
    })
  }
});

module.exports = bookrouter;
