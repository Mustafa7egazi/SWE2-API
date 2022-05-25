const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bodyParser = require('body-parser')
// const Coach = require('../coachScema')

const { Coach, validateCoach } = require("../coachScema");

router.use(bodyParser.json())

// إيجاد كل الجداول المضافة
router.get('/coach', async (req, res) => {
    try {
        const Coachs = await Coach.find()
        res.json(Coachs)
    } catch (err) {
        res.json(err)

    }
})

// بحث بإستخدام Id

// router.get('/coach/:CoachId', async (req, res) => {
//     try {
//         const serchCoachs = await Coach.findById(req.params.CoachId)
//         res.json(serchCoachs)
//     } catch (err) {
//         res.json(err)
//     }
// })

router.get("/coach/:coachId", async (req, res) => {
    const coach = await Coach.findById({ _id: req.params.coachId });
    if (!coach) return res.status(404).send("No such coach");
    res.status(200).send(coach);
  });


// تعديل بإستخدام Id
// router.put('/coach/:CoachId', async (req, res) => {
//     try {
//         const updateCoachs = await Coach.updateOne({ _id: req.params.CoachId },
//             {
//                 $set: {
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: req.body.password,
//                     talent: req.body.talent,
//                     learnersNumber: req.body.learnersNumber
//                 }
//             })
//         res.json(updateCoachs)
//     } catch (err) {
//         res.json("eRROR")
//     }
// })

router.put("/coach/:coachId", async (req, res) => {
    const { error } = validateCoach(req.body);
    if (error) return res.send(error.details[0].message);
  
    const coach = await Coach.findByIdAndUpdate(
      req.params.coachId,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        talent: req.body.talent,
        learnersNumber: req.body.learnersNumber
      },
      {
        new: true,
      }
    );
  
    res.status(200).send(coach);
  });


// حذف ب id
// router.delete('/coach/:CoachId', async (req, res) => {
//     try {
//         const deleteCoach = await Coach.remove({ _id: req.params.CoachId })
//         res.json(deleteCoach)
//     } catch (err) {
//         res.json(err)
//     }
// })

router.delete("/coach/:coachId", async (req, res) => {
    const coach = await Coach.findByIdAndRemove(req.params.coachId);
    if (!coach) return res.status(404).send("No such id for a coach");
    res.status(200).send("Deleted successfully");
  });
  

// إضافة عنصر جديد
// router.post('/coach' , async(req,res)=>{
//     const Coachs = new  Coach({
//         name : req.body.name,
//         email : req.body.email,
//         password : req.body.password,
//         talent : req.body.talent,
//         learnersNumber : req.body.learnersNumber
//     })
//     try{
// const saveCoach = await Coachs.save();
// res.json(saveCoach)
//     }catch{
//         res.json("error")

//     }
// })

router.post("/coach", async (req, res) => {
    const { error } = validateCoach(req.body);
    if (error) return res.send(error.details[0].message);

    const coach = new Coach({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        talent: req.body.talent,
        learnersNumber: req.body.learnersNumber
    });

    await coach.save();

    res.status(200).send(coach);
});


module.exports = router