import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Guild', Schema);
