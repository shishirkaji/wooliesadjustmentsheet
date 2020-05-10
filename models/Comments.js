var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
    comment : {
        type : String,
        required : true
    },
    addedDate :{
        type : String,
        required : true
    },
    addedBy:{
        type  : mongoose.Schema.Types.ObjectId,
        required : true
    }
})
// test
 module.exports = Comments  = mongoose.model("comments", CommentsSchema);

 