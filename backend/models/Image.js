const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String },
    uploadedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model("Image", imageSchema);