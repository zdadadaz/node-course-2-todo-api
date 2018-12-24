require('./../config/config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);
//'mongodb://zdadadaz:chiou5917@ds019482.mlab.com:19482/to-do-jcc'
module.exports={
    mongoose
};

//process.NODE_ENV == 'production'