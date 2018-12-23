var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//create 
app.post('/todos',(req,res)=>{
    
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
    //console.log(req.body);
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send(todos)
    },(e)=>{
        res.status(400).send(e);
    });
});

// GET /todos/1234324 ->get + variable
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('ID no found');
    }
    Todo.findById(id).then((todos)=>{
        if(!todos){
            return res.status(404).send('unable to find ID');
        }
        res.send({todos});
    }).catch((e)=>{
        res.status(400).send();
    }) 
});

app.listen('3000',()=>{
    console.log('Started on port 3000');
})

module.exports={app};
