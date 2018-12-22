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

    db.collection('User').find({name:'Andrew'}).toArray().then((doc)=>{
        console.log(JSON.stringify(doc,undefined,2));
    },(err)=>{
        if(err){
            console.log('Unable to fetch',err);
        }
    });

    /*
    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    },(err)=>{
        console.log('Unable to fetch',err);
    })
  /*
    db.collection('Todos').find({
        _id: new ObjectID( '5c1cdd3dfd8fabc8cce14c86') // _id should be call as obejct
    }).toArray().then((doc)=>{
        console.log('Todos');
        console.log(JSON.stringify(doc,undefined,2));
    },(err)=>{
        console.log('Unable to fetch',err);
    })*/

    client.close();
});