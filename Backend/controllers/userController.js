const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const { generateJwtToken } = require('../utils/generateJwtToken')



module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and Password are required' });
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = await generateJwtToken({ id: user._id })
        res.status(200).json({ token, success: true, message: 'Login successful', user: user.name});

    } catch (err) {
        console.log(err)
        res.json({ message: 'internal server error', success: false })
    }
}

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body
        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User alredy registed' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber
        })
        const token = await generateJwtToken({ id: user._id })
        res.status(201).json({ token, success: true, message: 'User registered successfully',user: user.name});
    } catch (err) {
        console.log(err)
        res.json({ message: 'internal server error', success: false})
    }
}

module.exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = await generateJwtToken({ email, password })
            res.status(200).json({ token, success: true, message: 'Admin Logged-In successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid credentials' })
        }
    } catch (err) {
        console.log(err)
        res.json({ message: 'internal server error', success: false })
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const userId = req.user

        const isUser = await userModel.findById(userId)
        if (!isUser) {
            return res.status(404).json({ message: 'user not found', success: false })
        } else {
            const { name, email, phoneNumber } = isUser
            return res.status(200).json({ message: 'user get successfully', success: true, user: { name, email, phoneNumber } })
        }
    } catch (er) {
        console.log(err)
        res.json({ message: 'internal server error', success: false })
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { name, phone } = req.body
        const userId = req.user

        const isUser = await userModel.findById(userId)

        if (!isUser) {
            return res.status(404).json({ message: 'user not found', success: false })
        } else {
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { $set: { name, phoneNumber: phone } },
                { new: true, runValidators: true }
            )

            res.status(200).json({ success: true, message: 'User profile updated successfully' })
        }
    } catch (err) {
        console.log(err)
        res.json({ message: 'internal server error', success: false })
    }
}