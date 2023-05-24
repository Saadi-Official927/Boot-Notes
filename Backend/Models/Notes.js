const mongoose = require( 'mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Title : {
        type: String,
        required : true
    },
    Description : {
        type: String,
        required : true
    },
    tag : {
        type: String,
        required : true,
        unique: true,
        default: 'General'
    },
    Date : {
        type : Date,
        default: Date.now
    }
});

const Notes = mongoose.model('notes', NoteSchema);
module.exports = Notes