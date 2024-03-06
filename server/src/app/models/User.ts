import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tag: String
}, { timestamps: true });

export default mongoose.model('User', Schema);