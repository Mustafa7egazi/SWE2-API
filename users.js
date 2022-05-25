const mongoose = require('mongoose')

const learner = mongoose.Schema({
    name : {
        type : String,

        require:true
    },
    email : {
        type : String,
        require:true
    },
    password : {
        type : String,

        require:true
    }
    ,
    hobby : {
    type:String,
    require : true ,

    }
})


module.exports = mongoose.model('Learner' , learner)
