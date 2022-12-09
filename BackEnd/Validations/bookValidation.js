// const yup = require('yup');

// const BookSchhema = yup.object({
//     bookId:yup.number().required(),
//     bookName:yup.string().required(),
//     authorName:yup.string().required(),
//     publishedYear:yup.number().required(),
//     bookPrice:yup.number().required(),
//     bookStatus:yup.boolean()
// });


// module.exports = BookSchhema

const joi = require('joi');

const validator = (schema) =>(payload)=>schema.validate(payload, {abortEarly: false});


const BookSchema = joi.object({
    bookId:joi.string().required(),
    bookName:joi.string().required(),
    authorName:joi.string().required(),
    publishedYear:joi.date().required(),
    bookPrice:joi.number().required(),
    bookStatus:joi.boolean().required()
});

exports.validateBookSchema = validator(BookSchema);