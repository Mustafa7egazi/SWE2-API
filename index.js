const express = require('express')
const mongoose = require('mongoose')


require('dotenv/config')

const app = express()

const userRouter = require('./Router/coach')

const learnerRouter = require('./Router/learner')

const hobbyRouter = require('./Router/hobby')

const authenticationRouter = require('./Router/authentication')


mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log("Connect to data base");
})


app.use(userRouter)

app.use(learnerRouter)

app.use(hobbyRouter);

app.use(authenticationRouter)


app.listen(3000,()=>{
    console.log("loading start >.......");
})
