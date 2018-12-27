var {User} = require('./../models/user')

// private route
// if authenticate ok-> do next
// authenticate is used to prevent the user from having to log in every time they want to visit a private route
var authenticate = (req,res,next) =>{
    var token = req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        //res.send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        return res.send(401).send();
    });
};
module.exports={authenticate};