const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find();
        res.render("read", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading users');
    }
});

app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        let usercreate = await userModel.create({
            name,
            email,
            image
        });
        res.redirect("/read" );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
});


app.get('/delete/:id',  async (req, res) => {
    let deluser = await  userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
})


app.get('/edit/:userid',  async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });
})


app.post('/update/:userid',  async (req, res) => {
    let { name, email, image } = req.body;
    let user = await userModel.findOneAndUpdate({ _id: req.params.userid } , { name, email, image } , {new:true});
    res.redirect("/read",);
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});