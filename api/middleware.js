module.exports={validateSession}

function validateSession(req,res,next){
    if(req.session && req.session.user){
        next()
    }else{
        res.status(400).json({message: "You shall not pass!'.Session expired, please login"})
    }
}