const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/userModels")


//@desc     Register a new User
//@route    /api/users
//@acces    public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, private_key, public_key } = req.body
    // handle later
    if (!name || !email || !password || !private_key || !public_key) {
        res.status(400)
        throw new Error("Please include all fields")
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        public_key,
        private_key, // handle later
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            public_key,
            private_key,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user Data")
    }
})

//@desc     Login a new User
//@route    /api/users/login
//@acces    public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            public_key: user.public_key,
            private_key: user.private_key,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1w" })
}

module.exports = {
    registerUser,
    loginUser
}