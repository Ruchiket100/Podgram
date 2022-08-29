const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
    {
        user: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        audioUrl: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Podcast", podcastSchema);
