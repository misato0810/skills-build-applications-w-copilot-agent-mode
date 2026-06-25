import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  teamId?: Types.ObjectId;
  points: number;
  totalActivities: number;
  totalCalories: number;
  totalDistance: number;
  rank: number;
  lastActivityDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
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
  },
  { timestamps: true }
);

// Index for sorting by points
leaderboardSchema.index({ points: -1 });
leaderboardSchema.index({ teamId: 1, points: -1 });

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
