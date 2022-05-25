const express = require("express");
const mongoose = require('mongoose')

const { Hobby, validate } = require("../hoppySchema");

// const Hobby = require('../hoppySchema')

const router = express.Router();

// mongoose.connect(process.env.DB_CONNECT,()=>{
//     console.log("Connect to data base");
// })

router.get("/hobbies", async (req, res) => {
  res.status(200).send(await Hobby.find());
});

router.get("/hobbies/:id", async (req, res) => {
  const hobby = await Hobby.findById({ _id: req.params.id });
  if (!hobby) return res.status(404).send("No hobby");
  res.status(200).send(hobby);
});

router.post("/hobby", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const hobby = new Hobby({
    name: req.body.name,
    price: req.body.price,
    sessions: req.body.sessions,
  });

  await hobby.save();

  res.status(200).send(hobby);
});

router.put("/hobbies/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const hobby = await Hobby.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      sessions: req.body.sessions,
    },
    {
      new: true,
    }
  );

  res.status(200).send(hobby);
});

router.delete("/hobbies/:id", async (req, res) => {
  const hobby = await Hobby.findByIdAndRemove(req.params.id);
  if (!hobby) return res.status(404).send("No hobby");
  res.status(200).send("Deleted successfully");
});

module.exports = router;