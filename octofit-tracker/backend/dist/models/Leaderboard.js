import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    points: {
        type: Number,
        default: 0,
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
    rank: {
        type: Number,
        default: 0,
    },
    lastActivityDate: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
// Index for sorting by points
leaderboardSchema.index({ points: -1 });
leaderboardSchema.index({ teamId: 1, points: -1 });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
