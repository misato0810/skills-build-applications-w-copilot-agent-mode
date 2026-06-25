import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting seed script...');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing collections...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Collections cleared');

    // ===== CREATE USERS =====
    console.log('👥 Creating users...');
    const users = await User.create([
      {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'password123',
        bio: 'Marathon runner and fitness enthusiast',
        totalActivities: 45,
        totalCalories: 18500,
        totalDistance: 325.5,
      },
      {
        name: 'Jordan Smith',
        email: 'jordan@example.com',
        password: 'password123',
        bio: 'Yoga and flexibility trainer',
        totalActivities: 32,
        totalCalories: 12800,
        totalDistance: 85.2,
      },
      {
        name: 'Taylor Davis',
        email: 'taylor@example.com',
        password: 'password123',
        bio: 'Cycling enthusiast',
        totalActivities: 38,
        totalCalories: 16200,
        totalDistance: 487.3,
      },
      {
        name: 'Casey Wilson',
        email: 'casey@example.com',
        password: 'password123',
        bio: 'Strength training champion',
        totalActivities: 52,
        totalCalories: 22100,
        totalDistance: 45.6,
      },
      {
        name: 'Morgan Brown',
        email: 'morgan@example.com',
        password: 'password123',
        bio: 'Swimming and cardio lover',
        totalActivities: 28,
        totalCalories: 11200,
        totalDistance: 156.4,
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // ===== CREATE TEAMS =====
    console.log('👫 Creating teams...');
    const teams = await Team.create([
      {
        name: 'Urban Runners',
        description: 'A team dedicated to running through the city',
        createdBy: users[0]._id,
        members: [users[0]._id, users[2]._id],
        totalMembers: 2,
        totalPoints: 2850,
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic fitness and wellness team',
        createdBy: users[1]._id,
        members: [users[1]._id, users[4]._id],
        totalMembers: 2,
        totalPoints: 1960,
      },
      {
        name: 'Iron Gym',
        description: 'Strength training and bodybuilding community',
        createdBy: users[3]._id,
        members: [users[3]._id],
        totalMembers: 1,
        totalPoints: 2210,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // ===== CREATE ACTIVITIES =====
    console.log('🏃 Creating activities...');
    const activities = await Activity.create([
      // Alex's activities (runner)
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 680,
        description: 'Morning run through downtown',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'running',
        duration: 30,
        distance: 5.2,
        calories: 420,
        description: 'Evening jog at the park',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      // Jordan's activities (yoga)
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        type: 'yoga',
        duration: 60,
        distance: 0,
        calories: 300,
        description: 'Relaxing vinyasa flow',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        type: 'flexibility',
        duration: 45,
        distance: 0,
        calories: 200,
        description: 'Morning stretching session',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      // Taylor's activities (cycling)
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        type: 'cycling',
        duration: 90,
        distance: 35.6,
        calories: 1200,
        description: 'Long weekend ride',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      // Casey's activities (strength)
      {
        userId: users[3]._id,
        teamId: teams[2]._id,
        type: 'strength',
        duration: 75,
        distance: 0,
        calories: 850,
        description: 'Upper body strength training',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      // Morgan's activities (swimming)
      {
        userId: users[4]._id,
        teamId: teams[1]._id,
        type: 'swimming',
        duration: 60,
        distance: 2.5,
        calories: 620,
        description: 'Lap swimming at the pool',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // ===== CREATE LEADERBOARD ENTRIES =====
    console.log('🏆 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.create([
      {
        userId: users[3]._id,
        teamId: teams[2]._id,
        points: 2210,
        totalActivities: 52,
        totalCalories: 22100,
        totalDistance: 45.6,
        rank: 1,
        lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        points: 1850,
        totalActivities: 45,
        totalCalories: 18500,
        totalDistance: 325.5,
        rank: 2,
        lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        points: 1560,
        totalActivities: 38,
        totalCalories: 16200,
        totalDistance: 487.3,
        rank: 3,
        lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        points: 1040,
        totalActivities: 32,
        totalCalories: 12800,
        totalDistance: 85.2,
        rank: 4,
        lastActivityDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]._id,
        teamId: teams[1]._id,
        points: 920,
        totalActivities: 28,
        totalCalories: 11200,
        totalDistance: 156.4,
        rank: 5,
        lastActivityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    // ===== CREATE WORKOUTS =====
    console.log('💪 Creating workouts...');
    const workouts = await Workout.create([
      {
        name: 'Morning Run',
        type: 'running',
        difficulty: 'intermediate',
        duration: 30,
        description: 'A moderate 5K run to start your day',
        exercises: ['5K run', 'Warm-up jog', 'Cool-down walk'],
        suggestedFor: 'all',
        caloriesBurned: 350,
      },
      {
        name: 'HIIT Cardio Blast',
        type: 'cardio',
        difficulty: 'hard',
        duration: 20,
        description: 'High intensity interval training for maximum calorie burn',
        exercises: ['Burpees', 'Mountain climbers', 'Jump squats', 'High knees'],
        suggestedFor: 'advanced',
        caloriesBurned: 400,
      },
      {
        name: 'Beginner Yoga Flow',
        type: 'yoga',
        difficulty: 'easy',
        duration: 45,
        description: 'Relaxing yoga session perfect for beginners',
        exercises: ['Sun salutations', 'Child pose', 'Downward dog', 'Lotus pose'],
        suggestedFor: 'beginners',
        caloriesBurned: 200,
      },
      {
        name: 'Strength Building',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 60,
        description: 'Full body strength training workout',
        exercises: ['Squats', 'Bench press', 'Deadlifts', 'Pull-ups', 'Dumbbell rows'],
        suggestedFor: 'intermediate',
        caloriesBurned: 450,
      },
      {
        name: 'Cycling Adventure',
        type: 'cycling',
        difficulty: 'intermediate',
        duration: 90,
        description: 'Long distance cycling for endurance building',
        exercises: ['Steady pace cycling', 'Hill climbs', 'Sprint intervals'],
        suggestedFor: 'all',
        caloriesBurned: 600,
      },
      {
        name: 'Swimming Endurance',
        type: 'swimming',
        difficulty: 'hard',
        duration: 60,
        description: 'Lap swimming for full body conditioning',
        exercises: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'],
        suggestedFor: 'advanced',
        caloriesBurned: 500,
      },
      {
        name: 'Flexibility & Stretching',
        type: 'flexibility',
        difficulty: 'easy',
        duration: 30,
        description: 'Improve flexibility and reduce muscle tension',
        exercises: ['Static stretches', 'Dynamic stretches', 'Foam rolling'],
        suggestedFor: 'all',
        caloriesBurned: 100,
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`
Summary:
- Users: ${users.length}
- Teams: ${teams.length}
- Activities: ${activities.length}
- Leaderboard entries: ${leaderboardEntries.length}
- Workouts: ${workouts.length}
    `);

    await mongoose.connection.close();
    console.log('✓ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  }
};

seedDatabase();
