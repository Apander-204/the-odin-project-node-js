const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: 'Message Board',
        messages: req.app.locals.messages
    });
});

router.get("/message/:id", (req, res) => {
    const message = req.app.locals.messages[req.params.id];

    if (!message) {
        return res.status(404).send("Message not found");
    }

    res.render('message', {text: message.text, user: message.user, added: message.added});
});

router.get("/new", (req, res) => {
    res.render("form");
});

router.post("/new", (req, res) => {
    const name = req.body.userName;
    const text = req.body.messageText;

    req.app.locals.messages.push({
        text: text,
        user: name || "Ghost",
        added: new Date()
    });

    res.redirect('/');
});

module.exports = router;