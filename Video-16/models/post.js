// Import mongoose
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/testingthedatabase`)


// Define the post schema
const postSchema = new mongoose.Schema({
    postdata: String,
    user: {type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Post model
module.exports = mongoose.model('Post', postSchema);