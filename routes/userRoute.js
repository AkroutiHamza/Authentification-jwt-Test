const User = require('../models/userModel'); 
const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const config = require('../config/config').secret; 


router.post('/register',(req,res)=>{
const name=req.body.name ; 
const email= req.body.email ; 
const password = bcrypt.hashSync(req.body.password,10); 

User.findOne({email:email},function(err,user){

    if(err){
             console.log(err); 
             }
 
     if(user)
            {
    console.log('alreasy exists...'); 
    res.json({err:'already exists'}) ; 
            }
            else
            {
    const newuser = new User( {
        email:email,
        password:password, 
        }); 
       newuser.save().then( result=>{
     const token =   jwt.sign({
            email:email, 
            userId:newuser._id 
        },config,
        ); 
        res.json({'result':result,
    'token':token}); 
       }) ;
}      


}); 



}); 

router.post('/login',(req,res)=>{
const email=req.body.email ; 
const psw = req.body.password ; 
User.findOne({'email':email},(err,user)=>{
if (err) throw err ; 

if(user)
{ bcrypt.compare(psw,user.password,(err,result)=>{

    if(err) {
        return res.status(401).json({
            message:'auth failed invalid password '
        });
    }else
    {
        if (result) {
           const token= jwt.sign({
                email:email, 
                userId:result._id 
            },config);
            res.status(200).json({
                'message':'auth success',
                'token':token
            });
            res.redirect('profile.ejs'); 
        }
    }
})
   
}
}); 
router.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
     email:req.email
    });
   });
  
 router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
   })
}); 

module.exports = router ; 