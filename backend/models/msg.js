const mongoose = require('mongoose');


const todoschema = mongoose.Schema({
    title : {
        required : [true,"Enter the title"],
        type : String
    },
    description : {
        type : String
    },
})

module.exports = mongoose.model('Todo',todoschema);