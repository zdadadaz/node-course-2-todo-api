// define mode == define table
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text:{
        type:String, //validator
        require:true,
        minlength: 1,
        trim: true // remove white space
    },
    completed: {
        type:Boolean,
        default:false //default
    },
    completedAt:{
        type:Number,
        default: null
    }
});

/*
var newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((res)=>{
    console.log('Save todo',res);
},(e)=>{
    console.log('Inable to save');
});

var otherTodo = new Todo({
    text:'   Edit this video'
});

otherTodo.save().then((doc)=>{
    console.log(JSON.stringify(doc,undefined,2));
},(e)=>{
    console.log('Unable to save',e);
})
*/


module.exports = {Todo};