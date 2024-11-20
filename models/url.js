const mongoose = require('mongoose')

const urlSchemas = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamps: { type: Number }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const URL = mongoose.model('url', urlSchemas)

module.exports = URL