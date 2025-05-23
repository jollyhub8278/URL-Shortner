/////JWT authentication
const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Bharti575"; //my secret key

//this function will create token for me(where that secret key is just like stamps on the token so that nomone else can use that token)
function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, 
    secret
  );
}

function getUser(token){
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return null;
    }
}

module.exports ={
    setUser,
    getUser,
};



//basically this is our diary: statefull authentication
//////////////////////////////////////
// const sessionIdToUserMap = new Map();

// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports ={
//     setUser,
//     getUser,
// };