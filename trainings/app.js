const express = require('express');
const app = express();
const path = require("node:path");

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { links: links, users: users });
});

app.listen(3000, (err) => {
    if(err) {
        throw err;
    }

    console.log("My Express app listening on port 3000");
});