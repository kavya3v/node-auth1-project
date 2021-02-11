const router=require('express').Router();
const {validateSession} = require('./middleware');
const dbModel=require('./dbModel');

router.get('/',validateSession,async(req,res,next)=>{
    try {
        const users= await dbModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
})

module.exports=router;