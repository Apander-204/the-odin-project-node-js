const db = require('../db/quires');
const bcrypt = require('bcrypt');
const passport = require('passport');

async function getMainPage(req, res) {
    if(req.user) {
        const filesArr = await db.findUserFiles(req.user);
        console.log(filesArr);
        res.render("index", {user: req.user, files: filesArr || []});
    } else {
        res.render("index", {user: null, files: []});
    }
}

async function getRegister(req, res) {
    res.render("register", {error: null});
}

async function getLogin(req, res) {
    const users = await db.getAllFiles();
    res.render("login");
}

async function getLogout(req, res) {
    res.render("logout");
}

async function postRegister(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await db.findUserByUsername(username);

    if (existingUser) {
        return res.render("register", { error: 'The user already exists' });
    }
            
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword);
    res.redirect("/login");
}

async function postLogin(req, res) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/register'
    })(req, res);
}

async function postLogout(req, res) {
    req.logout(() => {
        res.redirect("/");
    });
}

async function postUpload(req, res) {
    if (!req.file) {
        return res.status(400).send('The file has not been uploaded');
    }
    await db.addFile(req.file.filename, req.user);
    const filesArr = await db.findUserFiles(req.user);
    res.render("index", {user: req.user, files: filesArr});
}

module.exports = {
    getMainPage,
    getRegister,
    getLogin,
    postRegister,
    postLogin,
    getLogout,
    postLogout,
    postUpload
}