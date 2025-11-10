const path = require('path');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'index.html'));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'about.html'));
});
app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'contact-me.html'));
});
app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'files', '404.html'));
});

app.listen(3000, (req, res) => {
    console.log("Port 3000 listen");
});