var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archive = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    title:String,
    content:String,
    description:String
});

module.exports = archive;