const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./router/product.js');
const connectDB = require('./database/connect.js');

const app = express();
app.use(bodyParser.json());
connectDB();

app.use('/product', productRouter);

app.listen(3000,() =>{
    console.log('Server started on port 3000');
});