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
    var token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(()=>{
        return token;
    });
};

// UserSchema.methods.generateAuthToken = function () {
//     return new Promise((resolve, reject) => {
//         const user = this;
//         const access = 'auth';
 
//         const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
 
//         resolve({access, token});
//     });
// };

UserSchema.methods.removeToken = function(token){
    var user = this;
    return user.update({
        $pull:{
            tokens:{token}
        }
    });
};


UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET);
        //console.log('process.env.JWT_SECRET:',process.env.JWT_SECRET);
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
UserSchema.statics.findByCredentials = function(email,password){
    var User = this;

    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((resovle,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    resovle(user);
                }else{
                    reject();
                }
            });
        });
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