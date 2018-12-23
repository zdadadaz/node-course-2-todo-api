const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c1dbb8eb70332da47098191';

//if(!ObjectID.isValid(id)){
//    console.log('ID not valid');
//}

/*
// array
Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos',todos);
});
// single file
Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log('Todo',todo);
});


// use this find ID
Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by ID',todo);
}).catch((e)=> console.log(e));
*/

User.findById(id).then((user)=>{
    if(!user){
        return console.log('user not found');
    }
    console.log('User by ID',JSON.stringify(user,undefined,2));
}).catch((e)=>{console.log(e)});