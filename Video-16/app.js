
const express = require('express');
const app = express();
const port = 3000; 


const userModel = require("./models/user");
const postModel = require("./models/post");


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/create", async (req, res) => {
    let user = await userModel.create({
        username:"harsh",
        age:25,
        email:"harsh@gmail.com"
    }) 
    res.send(user)
});

app.get("/post/create", async(req, res) => {
    let post = await postModel.create({
        postdata:"how are you",
        user:"670fa25943428d6f2dba3cf2"
    })
    let user = await userModel.findOne({_id: "670fa25943428d6f2dba3cf2"});
    user.posts.push(post._id);
    await user.save()

    res.send({post,user})
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});