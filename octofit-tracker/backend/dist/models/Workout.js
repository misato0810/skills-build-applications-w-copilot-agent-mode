import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['running', 'cycling', 'swimming', 'hiking', 'cardio', 'strength', 'yoga', 'flexibility', 'other'],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'intermediate', 'hard'],
        default: 'intermediate',
    },
    duration: {
        type: Number,
        required: true,
        default: 30,
    },
    description: {
        type: String,
        default: '',
    },
    exercises: [
        {
            type: String,
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    suggestedFor: {
        type: String,
        enum: ['all', 'beginners', 'intermediate', 'advanced'],
        default: 'all',
    },
    caloriesBurned: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
