const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var User = mongoose.model('users',{
    name:{
        type:String,
        require:true,
        trim:true,
        minlength:1
    },
    email:{
        type:String,
        trim:true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

/*
var newUser = new user({
    name:'JC',
    email:'gmail.com'
});
newUser.save().then((doc)=>{
    console.log(JSON.stringify(doc,undefined,2));
},(e)=>{
    console.log('Unable to save',e);
});
*/
module.exports={User};