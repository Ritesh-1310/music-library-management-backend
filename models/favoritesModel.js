const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoritesSchema = new Schema({
    favorite_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    user_id: { 
        type: String, 
        required: true, 
        ref: "User" 
    },
    category: { 
        type: String, 
        enum: ["artist", "album", "track"], 
        required: true 
    },
    item_id: { 
        type: String, 
        required: true 
    }, // ID of artist, album, or track
}, { timestamps: true });

module.exports = mongoose.model("Favorite", favoritesSchema);
