const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bodyParser = require('body-parser')
const Learner = require('../users')


// require('dotenv/config')



// mongoose.connect(process.env.DB_CONNECT,()=>{
//     console.log("Connect to data base");
// })

router.use(bodyParser.json())


router.get('/learner' , async(req,res)=>{
    try{
const Learners = await Learner.find()
res.json(Learners)
    }catch(err){
        res.json(err)

    }
})

router.get('/learner/:LearnerId',async (req,res)=>{
    try{
        const serchLearners = await Learner.findById(req.params.LearnerId)
        res.json(serchLearners)
    }catch(err){
        res.json(err)
    }
})
router.put('/learner/:LearnerId',async (req,res)=>{
    try{
        const updateLearners = await Learner.updateOne({_id:req.params.LearnerId},
            {$set:{
                name :req.body.name,
                email : req.body.email,
                password : req.body.password,
                hobby: req.body.hobby
            }})
        res.json(updateLearners)
    }catch(err){
        res.json(err)
    }
})

router.delete('/learner/:LearnerId',async (req,res)=>{
    try{
        const deleteLearner = await Learner.remove({_id:req.params.LearnerId})
        res.json(deleteLearner)
    }catch(err){
        res.json(err)
    }
})

router.post('/learner' , async(req,res)=>{
    const Learners = new  Learner({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        hobby : req.body.hobby
    })
    try{
const saveLearner = await Learners.save();
res.json(saveLearner)
    }catch{
        res.json("error")

    }
})

module.exports = router


