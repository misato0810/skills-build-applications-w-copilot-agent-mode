import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    profileImage: {
        type: String,
        default: null,
    },
    totalMembers: {
        type: Number,
        default: 1,
    },
    totalPoints: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);
