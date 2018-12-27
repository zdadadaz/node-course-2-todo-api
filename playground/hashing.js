const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    });
});

var hashPassword = '$2a$10$.Qdji7yzdbdj5FtaT4LH0eMjM54GUSJ5D5uHKVjJNAb1ibta54Bcq';

bcrypt.compare(password,hashPassword,(err,result)=>{
    console.log(result);
});

// var data = {
//     id:10
// };
// var token = jwt.sign(data,'123abc');
// console.log(token);

// var decoder = jwt.verify(token + '1','123abc');
// console.log(decoder);


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// var data = {
//   id: 4  
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// // token.data = 5;
// // token.hash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if (resultHash == token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data was changed. Do not trust');
// }