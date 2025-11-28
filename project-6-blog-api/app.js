const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const PORT = process.env.PORT;

const controller = require('./controllers/Controller');

function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'The token is missing' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post("/api/register", controller.postRegister);
app.post("/api/login", controller.postLogin);
app.post("/api/newpost", authMiddleware, controller.postNewPost);
app.get("/api/getallposts", controller.getAllPosts);

app.listen(PORT || 5000, () => {
    console.log("Server started on port", PORT || 5000);
});