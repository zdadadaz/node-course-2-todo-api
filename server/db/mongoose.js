var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://zdadadaz:chiou5917@ds019482.mlab.com:19482/to-do-jcc');
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports={
    mongoose
};