const express=require('express')
const app=express()
const PORT=5000
const bcrypt=require('bcrypt')
const cors = require('cors');
const database=[]
const admin=["manyamsrivallabh@gmail.com"]

app.use(express.json());
app.use(cors());

app.post('/login',async(req,res)=>{
    console.log(database)
    const { email, password } = req.body
    const user= database.find((u)=> u.email===email)
    if(!user){
        return res.json({msg:"user not in database",switch_to:"Signup"})
    }
    const MatchPass= await bcrypt.compare(password,user.password)
    if(MatchPass){
    const admincheck=admin.find(u=> u===email)
    if(admincheck){
    res.json({msg: "yes",username: user.name,database:database})
    }else{
        res.json({msg: "yes",switch_to: "",username: user.name,database:null})
    } // ensures boolean});
    }else{
        res.json({msg:"Try Another Password",switch_to:""})
    }
    })
app.post('/signup',async(req,res)=>{
    try{
        const { name,email, password } = req.body
        const user= database.find((u)=> u.email===email)
        if(user){
            res.json({msg:"User already exists, try login or another username",switch_to:""})
        }else{
        const saltRounds=10
        const hashedPass= await bcrypt.hash(password, saltRounds)
        database.push({name:name,email:email,password:hashedPass})
        res.json({msg:"Account created",switch_to:"Login"})
        }}
        catch{
            res.json({msg:"Smtg's wrong",switch_to:""})
}
})
app.listen(PORT, ()=>{console.log(`server running on ${PORT}`)})
