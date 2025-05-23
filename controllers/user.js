const User = require("../models/user");
const {v4: uuidv4} = require('uuid');
const {setUser,
       getUser} = require('../services/auth');


async function handleUserSignup(req,res){
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const { email, password} = req.body;
    const user = await User.findOne({ email, password });

    if(!user) return res.render('login',{
        error: "Invalid Username or Password",
    });

    ////////////for statefull authentication

//    //if your user is correct then make a session id for that
//    const sessionId = uuidv4();
//    //now you generated an unique id now set it
//    setUser(sessionId, user);

/////////for jwt authentication 

   const token = setUser(user);
   res.cookie("uid", token);
   return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};