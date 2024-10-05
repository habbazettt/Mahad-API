const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    santri: {
        type: Array,
        default: [],
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Mentor", mentorSchema)