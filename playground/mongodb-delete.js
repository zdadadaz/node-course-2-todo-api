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

    //delete many
    db.collection('Todos').deleteMany({text:'Eat lunch'}).then((res)=>{
        console.log(res);
    });
    //deleteone
    db.collection('Todos').deleteOne({text:'Eat lunch'}).then((res)=>{
        console.log(res);
    });

    //findonetodelete=>best !
    db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
        console.log(res);
    });
    
    db.collection('User').deleteMany({name:'Andrew'});
    db.collection('User').findOneAndDelete({
        _id:new ObjectID("5c1cdf02821882c9661559ec")
    }).then((res)=>{
        console.log(res);
    });

    client.close();
});