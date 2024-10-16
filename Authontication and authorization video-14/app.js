const express = require ('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(cookieParser());



//encrypted
// app.get("/" , function (req , res ){
// bcrypt.genSalt(10, function(err,salt){
//     bcrypt.hash("pololololoo",salt,function(err, hash){
//         })
//     })
// res.send("working")
// });

// decrypted
// app.get("/" , function (req , res ){
    // bcrypt.genSalt(10, function(err,salt){
    //     bcrypt.hash("pololololoo",salt,function(err, hash){
    //         })
    //     })
    // res.send("working")
    // });



    app.get('/'  , function(req , res){
        let token = jwt.sign({email:"hasnain@example.com"}, "secret")
        res.cookie("token",token)
        res.send("done")
    });

    app.get("/read" , function(req,res){
        let data = jwt.verify(req.cookies.token , "secret")
        console.log(data)
    });




app.listen(3000)