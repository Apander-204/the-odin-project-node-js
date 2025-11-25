const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

const index = require('./routers/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(express.urlencoded({ extended: true }));

app.use("/", index);

app.locals.messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.listen(PORT || 3000, () => {
    console.log("Success");
});