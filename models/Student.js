const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : Number,
        required : true,
        unique : true
    },
    college : {
        type : String,
        required : true
    },
    degree : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    fees : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },

    query : {
        type : String,
        required : true
    }

}, {timestamps : true})


module.exports = mongoose.model('Students', StudentSchema);