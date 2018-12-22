//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();

// mongo v3
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        console.log('Unable to connect db');
    }
    console.log('connect to mongodb');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id:new ObjectID('5c1db0ae9fc42cc2908fd378')
    },{
        $set:{
        completed: true
        }
    },{
        returnOriginal:false
    }).then((res)=>{
        console.log(res);
    });
    
    db.collection('User').findOneAndUpdate({
        _id:new ObjectID('5c1cdec216ce1ac95110068f')
    },{
        $set:{
        name: 'The truth'
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((res)=>{
        console.log(res);
    });

    client.close();
});