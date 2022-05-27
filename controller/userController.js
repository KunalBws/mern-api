const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

//Register user

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all the fields')
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedpass
        })
        if(user){
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: generateToken(user._id)
            })
        }
    }catch(error){
        res.status(400)
        throw new Error('Invalid User data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
})

const getMe = asyncHandler(async (req, res) => {
    
    res.status(200).json(req.user)

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}