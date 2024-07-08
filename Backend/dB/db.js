const { default: mongoose } = require("mongoose");
require('dotenv').config()
const db=async()=>{
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB connected')
    }
    catch(error){
        console.log('DB connection failed: ',error)
    }
}
module.exports={db}