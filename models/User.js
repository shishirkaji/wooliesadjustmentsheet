const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required  : true,
        // unique :true
    },
    payrollId: {
        type : Number,
        required : true,
        unique : true
    },
    date : {
        type : Date,
        default : Date.now
    }
    ,position : {
        type: String,
        default : "manager"
    },

    department:{
        type : String,
        required : true
    }
});
module.exports = User = mongoose.model('user', UserSchema)