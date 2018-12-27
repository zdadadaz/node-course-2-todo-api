var env = process.env.NODE_ENV || 'development';
if(env ==='development' || env === 'test'){
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    });
//    console.log(' process.env.JWT_SECRET:',process.env.JWT_SECRET);
}

// if(env == 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if(env === 'test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }else{
//     process.env.MONGODB_URI = 'mongodb://zdadadaz:chiou5917@ds019482.mlab.com:19482/to-do-jcc';
// }