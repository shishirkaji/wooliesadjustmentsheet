var mongoose = reqiuire("mongoose");
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
    }
})