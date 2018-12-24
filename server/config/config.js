var env = process.env.NODE_ENV || 'developmnet';
//console.log('env ****',env);
if(env == 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else{
    process.env.MONGODB_URI = 'mongodb://zdadadaz:chiou5917@ds019482.mlab.com:19482/to-do-jcc';
}