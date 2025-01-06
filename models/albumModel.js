const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = new Schema({
    album_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    hidden: { 
        type: Boolean, 
        default: false 
    },
    artist_id: { 
        type: String, 
        required: true, 
        ref: "Artist" 
    },
}, { timestamps: true });

module.exports = mongoose.model("Album", albumSchema);
