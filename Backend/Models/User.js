const mongoose = require( 'mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Firstname : {
        type: String,
        required : true
    },
    Lastname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true
    },
    Password : {
        type : String,
        required :  true
    },
    Date : {
        type : Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User


//     For every type of schema
// const blogSchema = new Schema({
//     title: String, // String is shorthand for {type: String}
//     author: String,
//     body: String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs: Number
//     }
//   });