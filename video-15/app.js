const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const bcrypy = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'Public')))
app.use(cookieParser())


app.get('/', function (req, res) {
    res.render("index");
})

app.post('/create', function (req, res) {
    let { username, email, password, age } = req.body;

    bcrypy.genSalt(10, (err, salt) => {
        bcrypy.hash(password, salt, async (err, hash) => {
            let createduser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })
            let token = jwt.sign({ email }, "shhhhh")
            res.cookie("token", token)
            res.send(createduser)
        })
    })
})

app.get("/login", function (req, res) {
    res.render('login');
});

app.post("/login", async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("some this  is wrong");
    bcrypy.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, "shhhhh")
            res.cookie("token", token)
            res.send('yes you can login');
        }
        else res.send(' you can,t login')
    })
});


app.get("/logout", function (req, res) {
    res.clearCookie("token", "");
    res.redirect("/");
});
app.listen(3000);