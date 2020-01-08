const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyparser = require('body-parser'); 
require('dotenv/config');
const ejs =require('ejs');
//////Routes 
const userRoute = require('./routes/userRoute');  

const app =express(); 
app.use(bodyparser.urlencoded({ extended: false })); 
app.use(bodyparser.json()); 

// modélisation des pages ejs 
 app.set("view engine","ejs");
 app.set("views","views");

// direction vers la page login
app.get('users/login',(req,res)=>{res.render('signup.ejs')});
app.use('/users',userRoute);

// direction vers la page signup 
app.get('users/register',(req,res)=>{res.render('signup.ejs')});
app.use('/users',userRoute);

// direction vers la page profile 
app.get('users/profile',(req,res)=>{res.render('profile.ejs')});
app.use('/users',userRoute);

const port = process.env.PORT || 4000 ; 

// connetion to icloud database 
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser:true},
    ()=>{
    console.log('base de donnée est connecté')
    })

app.listen(port,()=>{

    console.log(`Running on port ${port}`) ; 
})