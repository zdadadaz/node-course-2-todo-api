const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique: true,
        required: 'Email address is required',
        validate:{
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email.'
        },
        //validate: [validateEmail, 'Please fill a valid email address'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type: String,
            require: true
        },
        token:{
            type: String,
            require:true
        }
    }]
});

// overwrite the method of toJSON
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']); 
};

//Andrew (twi save mehtod)
// UserSchema.methods.generateAuthToken = function () {
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

//     user.tokens = user.tokens.concat([{access, token}]);
//     return user.save().then(()=>{
//         return token;
//     });
// };

UserSchema.methods.generateAuthToken = function () {
    return new Promise((resolve, reject) => {
        const user = this;
        const access = 'auth';
 
        const token = jwt.sign({_id: user._id.toHexString(), access}, 'abs123').toString();
 
        resolve({access, token});
    });
};


var User = mongoose.model('users',UserSchema);

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