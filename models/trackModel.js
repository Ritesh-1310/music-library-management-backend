const mongoose = require("mongoose");
const { Schema } = mongoose;

const trackSchema = new Schema({
    track_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    }, // in seconds
    hidden: { 
        type: Boolean, 
        default: false 
    },
    album_id: { 
        type: String, 
        required: true, 
        ref: "Album" 
    },
    artist_id: { 
        type: String, 
        required: true, 
        ref: "Artist" 
    },
}, { timestamps: true });

module.exports = mongoose.model("Track", trackSchema);
