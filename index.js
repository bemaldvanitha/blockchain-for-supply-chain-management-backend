const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRouter = require('./router/product.js');
const productOwnerRouter = require('./router/productOwner.js');
const qrRouter = require('./router/qr.js');
const connectDB = require('./database/connect.js');

const app = express();
app.use(bodyParser.json());
connectDB();
app.use(cors());
app.use(express.static('./public'));

app.use('/product', productRouter);
app.use('/owner', productOwnerRouter);
app.use('/qr',qrRouter);

app.listen(4000,() =>{
    console.log('Server started on port 4000');
});