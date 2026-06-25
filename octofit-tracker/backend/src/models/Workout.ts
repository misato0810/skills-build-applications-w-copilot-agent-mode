import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  type: string;
  difficulty: 'easy' | 'intermediate' | 'hard';
  duration: number;
  description: string;
  exercises: string[];
  createdBy?: Types.ObjectId;
  suggestedFor: string;
  caloriesBurned: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
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
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
