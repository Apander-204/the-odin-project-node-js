const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    let page;

    switch(req.url) {
        case '/':
            page = './files/index.html';
            break;
        case '/about':
            page = './files/about.html';
            break;
        case '/contact-me':
            page = './files/contact-me.html';
            break;
        default:
            page = './files/404.html';
            break; 
    }

    fs.readFile(page, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.end(data);
    });
});

server.listen(3000, 'localhost', (req, res) => {
    console.log("Server listened");
});