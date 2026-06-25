import express from 'express';
import { Workout } from '../models/Workout';
const router = express.Router();
/**
 * GET /api/workouts
 * Retrieve available workout suggestions
 */
router.get('/', async (req, res) => {
    const { difficulty, type, limit = '10' } = req.query;
    try {
        const query = {};
        if (difficulty)
            query.difficulty = difficulty;
        if (type)
            query.type = type;
        const workouts = await Workout.find(query)
            .limit(parseInt(limit))
            .populate('createdBy', 'name email');
        res.json({
            message: 'Get workout suggestions',
            filters: { difficulty, type, limit },
            workouts,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
/**
 * POST /api/workouts
 * Create or suggest a new workout
 */
router.post('/', async (req, res) => {
    const { name, type, difficulty, duration, description, userId } = req.body;
    if (!name || !type || !difficulty) {
        res.status(400).json({
            error: 'Missing required fields: name, type, difficulty',
        });
        return;
    }
    try {
        const workout = await Workout.create({
            name,
            type,
            difficulty,
            duration: duration || 30,
            description: description || '',
            createdBy: userId || null,
        });
        res.status(201).json({
            message: 'Workout created successfully',
            workout,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
/**
 * GET /api/workouts/:id
 * Retrieve a specific workout
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findById(id).populate('createdBy', 'name email');
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json({
            message: `Get workout ${id}`,
            workout,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
/**
 * GET /api/workouts/personalized/:userId
 * Get personalized workout recommendations for a user
 */
router.get('/personalized/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Get random recommendations (in production, would use ML model)
        const recommendations = await Workout.find()
            .limit(3)
            .populate('createdBy', 'name email');
        res.json({
            message: `Get personalized workouts for user ${userId}`,
            userId,
            recommendations,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});
export default router;
