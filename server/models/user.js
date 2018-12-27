const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(()=>{
        return token;
    });
};

// UserSchema.methods.generateAuthToken = function () {
//     return new Promise((resolve, reject) => {
//         const user = this;
//         const access = 'auth';
 
//         const token = jwt.sign({_id: user._id.toHexString(), access}, 'abs123').toString();
 
//         resolve({access, token});
//     });
// };

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token,'abc123');
        //console.log(decoded);
    } catch(e){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // })
        return Promise.reject();
    }
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth',

    });
};
// middleware to hash password
UserSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        var password = user.password;
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,res)=>{
                user.password = res;
                next();
            })
        })
    }else{
        next();
    }
});


var User = mongoose.model('users',UserSchema);

module.exports={User};