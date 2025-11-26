const express = require("express");
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db/quires');
const app = express();
const controller = require('./controllers/Controller');

require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const userFolder = `uploads/user_${req.user.id || 'anonymous'}`;
        const fs = require('fs');
    
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        callback(null, userFolder);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now()  + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

app.use(session({
    secret: process.env.SECRET_PASSWORD_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await db.findUserByUsername(username);
        
        if (!user) {
            return done(null, false, { message: 'Неверное имя пользователя' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Неверный пароль' });
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await db.findUserById(id);
    done(null, user);
});


app.get("/", controller.getMainPage);
app.get("/register", controller.getRegister);
app.get("/login", controller.getLogin);
app.post("/register", controller.postRegister);
app.post("/login", controller.postLogin);
app.get("/logout", controller.getLogout);
app.post("/logout", controller.postLogout);
app.post('/upload', upload.single('document'), controller.postUpload);

app.listen(PORT || 3000, () => {
    console.log("Server is Started on port ", PORT || 3000);
});