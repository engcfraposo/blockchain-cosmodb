const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
    index: {
        required: true,
        type: mongoose.Schema.Types.Number,
    },
    transactionId: {
        required: true,
        type: mongoose.Schema.Types.String,
    },
    previousHash: {
        required: false,
        type: mongoose.Schema.Types.String,
    },
    data: {
        required: true,
        type: mongoose.Schema.Types.String,
    },
    timestamp: {
        required: true,
        type: mongoose.Schema.Types.Date,
    },
    nonce: {
        required: true,
        type: mongoose.Schema.Types.Number,
    },
    hash: {
        required: true,
        type: mongoose.Schema.Types.String,
    },
})

module.exports = mongoose.model("Block", BlockSchema);