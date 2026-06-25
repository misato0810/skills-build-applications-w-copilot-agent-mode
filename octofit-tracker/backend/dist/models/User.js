import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: '',
    },
    totalActivities: {
        type: Number,
        default: 0,
    },
    totalCalories: {
        type: Number,
        default: 0,
    },
    totalDistance: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
