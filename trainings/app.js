const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Hello, world!"));

app.listen(3000, (err) => {
    if(err) {
        throw err;
    }

    console.log("My first Express app listening on port 3000");
});