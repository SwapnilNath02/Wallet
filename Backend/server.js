const express=require('express')
const app=express()
const cors=require('cors')
const { default: mongoose } = require('mongoose')
// const { db } = require('./dB/db')
const {readdirSync}=require('fs')
require('dotenv').config()
const userRoutes = require('./routes/user');

const PORT=process.env.PORT

//middlewares
app.use(express.json()) 

//getting path in console
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

app.use(cors())

//routes
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)))

//login/signup route
app.use('/api/user', userRoutes)

// server()
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    //listen for request ---- (listen for requests only when connected to db)
    app.listen(PORT,()=>{
        console.log('connected to db & listening on port 4000')
    })
})
.catch((error)=>{
    console.log('DB connection error')
})
    
//
//another method for connecting database

    // app.get('/',(req,res)=>{
    //     res.send({mssg:'Hello World'})
    // })
    
    // const server =()=>{
    //     db()
    //     app.listen(PORT,()=>{
    //         console.log('You are listening to port:' ,PORT)
    //     })
    // }

