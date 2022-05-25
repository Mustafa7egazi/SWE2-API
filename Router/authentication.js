const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


router.post('/post', verifyToken ,(req, res) => {
    jwt.verify(req.token,"123",(err,data)=>
    {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: "Post created",
                data
            })
        }
    })
   
})

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: "7egz",
        password: "12345"
    }

    jwt.sign({ user }, "123", (err, token) => {
        if (err){
             res.json({ message: "username or password are not correct" })
        }
        else res.json({ token })
    })

})


function verifyToken(req,res,next)
{
   
   const bearerHeader = req.headers['authorization']

   if(typeof(bearerHeader) != 'undefined')
   {
    const bearer = bearerHeader.split(' ')

    const token = bearer[1]
 
    req.token = token;
 
    next()
   }
   else{
       res.sendStatus(403)
   }
  
}



module.exports = router;