//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();

// mongo v3
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        console.log('Unable to connect db');
    }
    console.log('connect to mongodb');

    /*
    const db = client.db('TodoApp');
    db.collection('User').insertOne({
        _id:123,
        name:'JC',
        age:25,
        location:'14 aylesford'
    },(err,result)=>{
        if(err){
            console.log('Unable to insert table');
        }
        console.log(JSON.stringify(result.ops[0]._id,undefined,2));
    });
*/
    /*
    const db = client.db('TodoApp')
    db.collection('Todos').insertOne({
        text:"something to do",
        completed : false
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert todo',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));

    });
*/
    client.close();
});