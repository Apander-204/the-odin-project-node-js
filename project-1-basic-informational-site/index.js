const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT;

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

app.listen(PORT || 3000, (req, res) => {
    console.log("Port listen", PORT || 3000);
});