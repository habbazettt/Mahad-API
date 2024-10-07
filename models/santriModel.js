const mongoose = require('mongoose')

const santriSchema = new mongoose.Schema({
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mentor'
    },
    mentorName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    setoran: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Santri', santriSchema)