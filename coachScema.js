const mongoose = require('mongoose')
const Joi = require("joi");

const coach = mongoose.Schema({
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
    talent : {
    type:String,
    require : true ,

    },
    learnersNumber :{
    type:Number,
    require:true,


    }
})

function validateCoachErrors(coach) {
    return Joi.validate(coach, {
      name: Joi.string().min(3).max(256).required(),
      email: Joi.string().min(3).max(256).required(),
      password: Joi.string().min(6).required(),
      talent: Joi.string().min(3).max(256).required(),
      learnersNumber: Joi.number().min(1).greater(0).max(100).required(),
    });
  }


  module.exports.Coach = mongoose.model("Coach", coach);
  module.exports.validateCoach = validateCoachErrors;
