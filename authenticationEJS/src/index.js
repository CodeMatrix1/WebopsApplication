const express=require('express')
const app=express()
const PORT=5000
const path=require('path');
const { fileURLToPath } = require('url');
const Collection=require('./config.js')
const bcrypt=require('bcrypt')

app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render("login")
})
app.get('/signup',(req,res)=>{
    res.render("signup")
})
app.post('/signup',async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    const exist= await Collection.findOne({name:data.name})
    if(exist){
        res.send("user exists, try another username")
    }else{
        const saltRounds=10
        const hashedPass= await bcrypt.hash(data.password, saltRounds)
        data.password=hashedPass
        const userdata=await Collection.insertMany(data)
        console.log(userdata)
}
})
app.post('/login',async(req,res)=>{
    try{
        const data={
            name:req.body.username,
            pass:req.body.password
        }
    const check= await Collection.findOne({name:data.name})
    if(check){
        const MatchPass= await bcrypt.compare(data.pass,check.password)
        if(MatchPass){
            res.send("success, Welcome to Home")
        }else{
            res.send("tryagain")
        }
    }else{
        res.send("user doesnt exist")
    }
}catch{
    res.send("Smtg's wrong")
}
})
app.listen(PORT, ()=>{console.log(`server running on ${PORT}`)})
