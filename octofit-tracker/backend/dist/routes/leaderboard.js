import express from 'express';
import { Leaderboard } from '../models/Leaderboard';
const router = express.Router();
/**
 * GET /api/leaderboard
 * Retrieve leaderboard rankings
 */
router.get('/', async (req, res) => {
    const { teamId, metric = 'points', limit = '10' } = req.query;
    try {
        const query = {};
        if (teamId)
            query.teamId = teamId;
        const sortBy = {};
        sortBy[metric] = -1;
        const leaderboard = await Leaderboard.find(query)
            .sort(sortBy)
            .limit(parseInt(limit))
            .populate('userId', 'name email')
            .populate('teamId', 'name');
        res.json({
            message: 'Get leaderboard',
            filters: { teamId, metric, limit },
            leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
/**
 * GET /api/leaderboard/team/:teamId
 * Retrieve leaderboard for a specific team
 */
router.get('/team/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const { metric = 'points', limit = '10' } = req.query;
    try {
        const sortBy = {};
        sortBy[metric] = -1;
        const leaderboard = await Leaderboard.find({ teamId })
            .sort(sortBy)
            .limit(parseInt(limit))
            .populate('userId', 'name email');
        res.json({
            message: `Get team leaderboard for ${teamId}`,
            teamId,
            metric,
            leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
/**
 * GET /api/leaderboard/user/:userId
 * Retrieve user's leaderboard position
 */
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const entry = await Leaderboard.findOne({ userId })
            .populate('userId', 'name email');
        if (!entry) {
            res.status(404).json({ error: 'User not found in leaderboard' });
            return;
        }
        res.json({
            message: `Get leaderboard position for user ${userId}`,
            userId,
            position: entry,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user position' });
    }
});
export default router;
