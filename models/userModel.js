const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    user_id: { 
    type: String, 
    required: true, 
    unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["Admin", "Editor", "Viewer"], 
        required: true 
    },
}, 
{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
