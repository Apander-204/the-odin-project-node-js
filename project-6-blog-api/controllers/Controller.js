const db = require('../db/quires');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

async function postRegister(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const search = await db.findUserByUsername(username);

    if(search) {
        res.send("Такой аккаунт уже существует");
    } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.registerUser(username, hashedPassword);

    const newUser = await db.findUserByUsername(username);

    console.log(newUser);

    const token = jwt.sign(
        { userId: newUser.id },
        secretKey
    );

    res.json({ 
        message: 'Успешная регистрация!',
        token: token
    });
    }
}

async function postLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const search = await db.findUserByUsername(username);

    if(!search) {
        res.send("Неверный логин или пароль");
    } else {
        const validPassword = await bcrypt.compare(password, search.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Неверный логин или пароль' });
        }

        const token = jwt.sign(
            { userId: search.id }, 
            secretKey
        );

        res.json({ 
            message: 'Успешный вход!', 
            token: token 
        });
    }
}

async function postNewPost(req, res) {
    const title = req.body.title;
    const message = req.body.message;
    const userId = req.userId;

    await db.newPost(title, message, userId);

    res.json({
        message: "Пост создан!"
    });
}

async function getAllPosts(req, res) {
    const posts = await db.getAllPosts();
    console.log(posts);
    res.json(posts);
}

module.exports = {
    postRegister,
    postLogin,
    postNewPost,
    getAllPosts
}