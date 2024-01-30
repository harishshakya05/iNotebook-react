const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const NotesSchema = new Schema({
    user: ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,        
    },
    tags: {
        type: String,       
    },    
    date: { type: Date, default: Date.now },  
});

module.exports = mongoose.model('notes', NotesSchema);