const mongoose = require('mongoose');

// Define the connection string
const uri = "mongodb://localhost:27017/product";

// Use Mongoose to connect to the database
const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("Error connecting to the database: ", err);
    });

export default connection;const mongoose = require('mongoose');

// Define the schema for a blog post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

// Create a model for the blog post schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
