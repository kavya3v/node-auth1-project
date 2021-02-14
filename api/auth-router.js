const router=require('express').Router();
const bcrypt=require('bcryptjs');
const {findUser,getUsers,addUser}= require('./dbModel');
const {validateSession}=require('./middleware');

router.post('/register', async (req,res,next)=>{
   let user = req.body;
   //hash the req password , then send to db
    const hash = bcrypt.hashSync(user.password,10);
    user.password = hash;
    try {
        const [newUser]= await addUser(user)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

router.get('/login', async(req,res,next)=>{
    const {username,password}= req.body;
    
    try {
        const user= await findUser({username});
        if(user && bcrypt.compareSync(password,user.password)){
            req.session.user =user //to indicate new session created for user
            res.status(200).json(`welcome ${username}`)
        }else 
            res.status(400).json(`You shall not pass! Invalid credentials`)
    } catch (err) {
        next(err)
    }
})

router.get('/logout',async(req,res,next)=>{
    if(req.session){
        req.session.destroy((err)=>{
            if(err){
                req.status(400).json({message: "Error in session logout"})
            }else{
                res.status(204).json({message: "logged out successfully"}).end();
            }
        }) 
    }else res.json({message: "log out success"});
})
module.exports=router;