const mongoose = require('mongoose')

const setoranSchema = new mongoose.Schema({
    santriId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Santri'
    },
    santriName: {
        type: String,
        required: true
    },
    kategori: {
        type: String,
        required: true
    },
    juz: {
        type: Number,
        required: true
    },
    total: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Setoran', setoranSchema)