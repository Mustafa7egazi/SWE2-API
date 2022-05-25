const Joi = require("joi");
const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  sessions: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
});

function validateErrors(hobby) {
  return Joi.validate(hobby, {
    name: Joi.string().min(3).max(256).required(),
    price: Joi.number().min(0).greater(0).required(),
    sessions: Joi.number().min(1).greater(0).max(100).required(),
  });
}

module.exports.Hobby = mongoose.model("Hobby", hobbySchema);

module.exports.validate = validateErrors;
