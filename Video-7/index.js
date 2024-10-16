const express = require('express');
const app = express();
const path = require('path');
const fs =  require('fs');

// Set view engine to ejs
app.set("view engine", "ejs");

// Use express.json() to parse JSON bodies
app.use(express.json());

// Use express.urlencoded() to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the Public directory
app.use(express.static(path.join(__dirname, "Public")));

// Define a route for the root URL
app.get('/', function (req, res) {
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    })
});

app.get('/files/:filename', function (req, res) {
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
        res.render('show',{ filename: req.params.filename, filedata:filedata})
    })
});

app.get('/edit/:filename', function (req, res) {
    res.render('edit',{filename: req.params.filename});
});


app.post('/create', function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
res.redirect("/")
    })
});
// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));