const pool = require('./pool');

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function findUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = ($1)", [username]);
    return rows[0];
}

async function registerUser(username, password) {
    const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
    return newUser;
}

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function newPost(title, message, id) {
    await pool.query("INSERT INTO posts (title, message, active, userid) VALUES ($1, $2, True, $3)", [title, message, id]);
    return "Success";
}

async function getAllPosts(title, message, id) {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
}

module.exports = {
    findUserByUsername,
    registerUser,
    getAllUsers,
    newPost,
    getAllPosts
}