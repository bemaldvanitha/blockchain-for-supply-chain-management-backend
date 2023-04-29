const mongoose = require('mongoose');

// Define the connection string
const uri = "mongodb://localhost:27017/product";

// Use Mongoose to connect to the database
const connectDB = async () => {

    try{
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MONGODB connected');

    }catch (err){
        console.error(err.message);
        // exit if fail
        process.exit(1);
    }
}

module.exports = connectDB;