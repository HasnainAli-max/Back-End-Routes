const mongoose = require("mongoose");

// Corrected the MongoDB connection string
mongoose.connect("mongodb://127.0.0.1:27017/testapp1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    image: String,
    email: String,
    name: String
});

// Export the model
module.exports = mongoose.model('User ', userSchema);