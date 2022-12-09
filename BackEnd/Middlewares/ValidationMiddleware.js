// const BookValidation = (BookSchhema)=> async(req, res, next)=>{
//     const resource = req.body
//     try{
//         await BookSchhema.BookValidation({
//             resource
//         });
//         return next();
//     }
//     catch(err){
//         return res.status(400).json({
//             type:err.name,
//             message:err.message
//         })
//     }
// }





// module.exports = BookValidation;