const mongoose = require('mongoose'); // Corrected the spelling of 'mongoose'
mongoose.connect('mongodb://localhost:27017/miniproject')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: String,
    email: String,
    password: String,
    post:[{
        type:mongoose.Schema.Types.ObjectId,ref:"post"
    }]
});

module.exports = mongoose.model("User ", userSchema);