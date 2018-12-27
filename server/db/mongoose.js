require('./../config/config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
mongoose.connect(process.env.MONGODB_URI);
module.exports={
    mongoose
};
