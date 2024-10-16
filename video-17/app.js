const express = require('express');
const app = express();
const userModel = require("./module/user");
const postModel = require("./module/post");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
    res.render('index');
});

app.get("/login", function (req, res) {
    res.render('login');
});

app.get("/profile", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({email: req.user.email})
    console.log(user)
    res.render("profile", {user});
});

app.get("/logout", function (req, res) {
    res.cookie("token", "");
    res.redirect("/login")
});

app.post("/register", async function (req, res) {
    let { name, username, email, age, password } = req.body;
    let user = await userModel.findOne({ email })
    if (user) return res.status(500).send("user already registered")
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh")
            res.cookie("token", token);
            res.send("registered")  
        })
    })
});

app.post("/login", async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send("Some Thing Went Wrong ");
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh")
            res.cookie("token", token);
            res.status(200).redirect("/profile");

        }
        else res.redirect("/login")
    })
});

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.redirect("/login")
    else {
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    }

}

app.listen(3000);