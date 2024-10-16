
const mongoose = require("mongoose");


mongoose.connect(`mongodb://127.0.0.1:27017/testingthedatabase`)

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [{type:mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('User ', userSchema);