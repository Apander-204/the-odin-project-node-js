const pool = require('./pool');

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function getAllFiles() {
    const { rows } = await pool.query("SELECT * FROM files");
    return rows;
}

async function findUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = ($1)", [username]);
    return rows[0];
}

async function findUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [id]);
    return rows[0];
}

async function createUser(username, password) {
    const { rows } = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
    return rows;
}

async function addFile(fileName, username) {
    const { rows } = await pool.query("INSERT INTO files (filename, userid) VALUES ($1, $2)", [fileName, username.id]);
    return rows;
}

async function findUserFiles(user) {
    const { rows } = await pool.query("SELECT * FROM files WHERE userid = ($1)", [user.id]);
    return rows;
}

module.exports = {
    findUserByUsername,
    findUserById,
    createUser,
    getAllUsers,
    addFile,
    getAllFiles,
    findUserFiles
}