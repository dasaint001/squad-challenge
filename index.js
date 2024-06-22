const express = require('express');
const cors  = require('cors')


const transactionRouter = require("./routes/transactions")
const merchantRouter = require("./routes/merchant")

const app = express();
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const port = process.env.port || 3000;


app.use('/api/transaction', transactionRouter)
app.use('/api/merchant', merchantRouter)

app.listen(port, () => console.log(`⚡️[server]: Magic happens on port ${port}`))

module.exports = app;