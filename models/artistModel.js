const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
    artist_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    grammy: { 
        type: Boolean, 
        default: false 
    },
    hidden: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

module.exports = mongoose.model("Artist", artistSchema);
