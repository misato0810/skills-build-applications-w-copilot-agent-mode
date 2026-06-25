import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    type: {
        type: String,
        enum: ['running', 'cycling', 'swimming', 'hiking', 'cardio', 'strength', 'yoga', 'flexibility', 'other'],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        default: 0,
    },
    distance: {
        type: Number,
        default: 0,
    },
    calories: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: '',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
