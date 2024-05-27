const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createCustomer = require("./routes/create_customer")
const adminLogin = require("./routes/login_route")
const Product = require("./routes/product_route")
const Order = require("./routes/order_route")
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); 
app.use("/auth",createCustomer);
app.use("/auth",adminLogin);
app.use("/order",Order);
app.use("/product",Product);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

