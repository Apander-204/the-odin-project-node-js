const express = require('express');
const app = express();
const userController = require('./controllers/controller');

app.get("/", userController.getUsernames);

app.get("/new", userController.createUsernameGet);

app.post("/new", userController.createUsernamePost);

app.get("/delete", userController.deleteUsernameGet);

app.listen(3000, () => {
  console.log("Server started");
});