const mongoose = require("mongoose");

async function connnectMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = { connnectMongoDB }