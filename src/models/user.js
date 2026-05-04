import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    gender: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
