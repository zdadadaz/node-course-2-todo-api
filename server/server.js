require('./config/config');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();

const port = process.env.PORT || 3000;

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

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('ID no found');
    }
    Todo.findByIdAndRemove(id).then((todos)=>{
        if(!todos){
            return res.status(404).sned('Unable to find ID');
        }
        res.send({todos});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id',(req,res)=>{
   var id = req.params.id;
   var body = _.pick(req.body,['text', 'completed']);
   if(!ObjectID.isValid(id)){
      return res.status(404).send('ID no found');
   }
   if(_.isBoolean(body.completed)&& body.completed){
       body.completedAt = new Date().getTime();
   } else{
       body.completed = false;
       body.completedAt = null;
   }
   Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
   }).catch((e)=>{
       res.status(400).send();
   })
});

// POST /users
app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email', 'password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })

    // user.generateAuthToken()
    //     .then((result) => {
    //        user.tokens = user.tokens.concat([result]);
 
    //        user.save()
    //        .then ((user) => res.header('x-auth', result.token).send(user))
    //        .catch(err => res.status(400).send(err));
    //     });
});

//middleware function, no next no process below
app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

// POST /users/login {email,password}
app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email', 'password']);
    
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log(`start up with ${port}`);
})

module.exports={app};
