import mongoose from "mongoose"

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: 'Thumbnail', required: true }
} , {timestamps : true });

export const Vote = mongoose.model('Vote', voteSchema);