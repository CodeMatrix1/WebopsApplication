//pass 1q62Uezp4LN1bjBr
const mong_URL="mongodb+srv://manyamsrivallabh:1q62Uezp4LN1bjBr@cluster0.7ra90z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoose=require('mongoose')
const connect=mongoose.connect("mongodb+srv://manyamsrivallabh:1q62Uezp4LN1bjBr@cluster0.7ra90z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

connect.then(()=>{
    console.log("connected")
}).catch(()=>{
    console.log("Not connected")
})

const LoginSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection= mongoose.model("users", LoginSchema)

module.exports=collection