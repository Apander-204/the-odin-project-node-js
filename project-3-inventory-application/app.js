const express = require('express');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

const baseRouter = require('./routes/baseRouter')
const categoryRouter = require('./routes/categoryRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use("/", baseRouter);
app.use("/category/", categoryRouter);

app.listen(PORT || 3000, () => {
    console.log("Server Listening on port ", PORT);
});