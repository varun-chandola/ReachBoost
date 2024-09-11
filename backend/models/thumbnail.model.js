import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema({
    // youtuber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    // url: { type: String, required: true },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps : true});

export const Thumbnail = mongoose.model('Thumbnail', thumbnailSchema);