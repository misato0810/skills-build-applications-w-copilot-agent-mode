import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  teamId?: Types.ObjectId;
  type: string;
  duration: number;
  distance: number;
  calories: number;
  description: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
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
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
