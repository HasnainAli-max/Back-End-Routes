const express =  require('express');
const app = express();

const userModel = require('./Usermodel');


app.get('/',function(req,res){
    res.send('welcome')
});

app.get('/create',async function(req,res){
    let createduser = await userModel.create({
        name:'Hasnain',
        email:'ha3710191@gmail.com',
        username:'Hasnain Ali'
    })
    res.send(createduser);
});


app.get('/update', async function(req, res) {
    // let updatedUser = await userModel.findOneAndUpdate(findone,update,{ new: true }
    let updatedUser = await userModel.findOneAndUpdate({ username: "Hasnain Ali" },{ name: "Bazil" },{ new: true }
    );
    res.send(updatedUser);
});


//for reading one  user 
// app.get('/read', async (req, res) => {
//     let user = await userModel.find({name:"Hasnain"});
//     res.send(user);
// })
// for reading all users
app.get('/read', async (req, res) => {
    let user = await userModel.find();
    res.send(user);
})


app.get('/delete', async (req, res) => {
    let userdel = await userModel.findOneAndDelete({name:'Hasnain'});
    res.send(userdel);
})

app.listen(3000);
