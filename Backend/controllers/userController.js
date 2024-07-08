const User = require('../models/userModel')
const jwt=require('jsonwebtoken')
require('dotenv').config();

//create token
const createToken=(_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

    try {
      const user = await User.login(email, password)
      
      //create token
      const token = createToken(user._id)

      res.status(200).json({id:user._id,email, username: user.username, token})
    } 
    catch (error) {
      res.status(400).json({error: error.message})
    }
}

// signup a user
const signupUser = async (req, res) => {
//   res.json({mssg: 'signup user'})
    const {email, username , password} = req.body

    try {
      const user = await User.signup(email,username, password)
      
      //create token
      const token = createToken(user._id)

      res.status(200).json({ id:user._id , email, username, token})
    } 
    catch (error) {
      res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser }