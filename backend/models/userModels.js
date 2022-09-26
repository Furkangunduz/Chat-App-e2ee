const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    public_key: {
        type: String,
        required: [true, ""]
    },
    private_key: {
        type: String,
        required: [true, ""]
    },

    friends: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)